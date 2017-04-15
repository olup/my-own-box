// Requiring Librairies
var apiRouter = require('express').Router();
var bodyParser = require('body-parser');
var url = require('url');
var mime = require('mime');
var path = require('path');
var mw = require('dat-middleware');
var flow = require('middleware-flow');
var morgan = require('morgan');
var error = require('debug')('rest-fs:fileserver');
var txtorbin = require('istextorbinary')
var multer = require('multer');
var rimraf = require('rimraf')
var fs = require ("fs")
var slash = require('slash');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
var mkdirp = require("mkdirp")
var exec = require('child_process').exec;

mime.define({
    'text/x-toml': ['toml']
});

// basics middleware

// CORS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
}




// global conf variables
var conf
var basePath

// Main function
var fileserver = function(app, confArg) {

  // Ensure function arguments
  if (!app || !confArg) {
    throw new Error('express app AND conf object required');
  }

  // populate global var
  conf = confArg
  basePath = path.join(confArg.basePath, confArg.subPath)

  // Multer custom storage place
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
          var reqPath = decodeURI(url.parse(req.url).pathname)
          var completePath = slash(path.join(basePath,reqPath))

          var newDestination = completePath;
          var stat = null;
          try {
              stat = fs.statSync(newDestination);
          } catch (err) {
              fs.mkdirSync(newDestination);
          }
          if (stat && !stat.isDirectory()) {
              throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
          }       
          cb(null, newDestination);
      }
  });

  // upload middleware

  var upload = multer(
      { 
          dest: '/',
          storage: storage
      }
  );


  // Prepare request
  app.use(allowCrossDomain);
  app.use(cookieParser())
  app.use(bodyParser.json());

  // health
  apiRouter.get('/health-check', healthCheck)

  // Logs
  apiRouter.use(morgan('tiny'));

  // Login
  apiRouter.post('/login', login)
  
  // Protect following routes
  apiRouter.use(filter)
  apiRouter.use(checkAuth)

  apiRouter.post('/exec', execute)

  // Routes
  apiRouter.get('/*', getFileOrFolder)
  apiRouter.post("/*", upload.single("file"), postFileOrDir)
  apiRouter.put("/*", putFileOrDir)
  apiRouter.delete('/*', delFileOrFolder)

  // Link api endpoint and return router
  app.use("/api", apiRouter)
  return app;
};


// controller routes

// Health Check
function healthCheck (req, res, next) {
  return res.json({success : true, message:"Api is online"})
}

// Auth
function checkAuth (req, res, next) {
  if(!conf.users) return next()
  token = req.headers.token || req.cookies.token
  if (!token) return res.status(401).json({error : true, message : "token not present or invalid"})
    // invalid token
  jwt.verify(token, conf.jwtSecret, function(err, decoded) {
  if (err) return res.status(401).json({error : true, message : "token invalid"})
    return next()
  });
}

// Login 
function login (req, res, next){
  var creds = req.body
  var users = conf.users

  if(!users) res.status(200).json({success: true})

  var id = users.findIndex(user => user.username == creds.username && user.password == creds.password)
  if(id == -1) return res.status(401).json({error : true, message : "wrong credentials"})
  else {
    jwt.sign({username : users[id].username}, conf.jwtSecret, { algorithm: 'HS256' }, (err, token) => {
      if(err) return res.json(err)
      return res.json({success : true, token : token})
    })
  }

}

// Filter file 
function filter(req,res,next){
  var reqPath = decodeURI(url.parse(req.url).pathname)
  var name = req.body.name || ""
  var completePath = slash(path.join(basePath,reqPath, name))

  if(filterFile(completePath)) return next()
  else return res.status(403).json({error : true, message : "Type disabled"})

  
}

// Get
var getFileOrFolder = function (req, res, next) {

  var reqPath = decodeURI(url.parse(req.url).pathname)
  var topPath = path.dirname(reqPath)
  var name = path.basename(reqPath)
  var completePath = slash(path.join(basePath,reqPath))
  var mimeType

  var content
  var fileList = []

  try{
    type = fs.lstatSync(completePath).isDirectory()?"directory":"file"
    if(type == "file"){
      mimeType = mime.lookup(completePath); 
      if(mimeType.indexOf("text")!=-1 || txtorbin.isTextSync(completePath)){
        content=fs.readFileSync(completePath, "utf8")
      }
    }else{
      files = fs.readdirSync(completePath)
      for (let file of files){
        let name = file
        let topPath = reqPath 
        let mimeType
        let type = fs.lstatSync( path.join(basePath,topPath,name) ).isDirectory()?"directory":"file"
        if(type == "file") mimeType = mime.lookup( path.join(basePath,topPath,name) );
        if(filterFile(path.join(basePath,topPath,name))) fileList.push({name , topPath, type, mimeType })
      }
    }
    // Option to download or get the raw file
    if(type == "file" && req.query.option == "download") return res.download(completePath)
    if(type == "file" && req.query.option == "raw") return res.sendFile(path.join(completePath))
    // Return JSON of file object
    return res.json({ topPath, name, type, fileList, content, mimeType})
  }catch(err){
    return res.status(400).json({err}) 
  }
  

}


// Post
var postFileOrDir = function (req, res, next) {

  var reqPath = decodeURI(url.parse(req.url).pathname)
  var topPath = path.dirname(reqPath)
  var name = req.body.name || ""
  var isDir = name && name.substr(-1) === '/' || false;
  var completePath = slash(path.join(basePath,reqPath, name))
  var mimeType

  mkdirp.sync(path.dirname(completePath))

  if(req.file){
    var file = req.file
    fs.renameSync(path.join(file.destination,file.filename), path.join(file.destination, file.originalname))
    return res.json({name : file.originalname, mimeType : mime.lookup(file.originalname), type:"file" })
  }

  if (isDir) {
    name = name.slice(0,-1)
    try {
      fs.mkdirSync(completePath);
    } catch(e) {
      if ( e.code != 'EEXIST' ) console.log("allready exists")
    }
  }
  else {
    try {
      fs.writeFileSync(completePath, req.body.content || "");
    } catch(e) {
      if ( e.code != 'EEXIST' ) console.log("allready exists")
    }
  }

  res.status(201).json({name, mimeType : isDir ? undefined : mime.lookup(name), type : isDir?"directory":"file", topPath})
};

// Put
var putFileOrDir = function (req, res, next) {
  var reqPath = decodeURI(url.parse(req.url).pathname)
  var topPath = path.dirname(reqPath)
  var name = path.basename(reqPath)
  var completePath = slash(path.join(basePath,reqPath))

  var body = req.body

  try{
    type = fs.lstatSync(completePath).isDirectory()?"directory":"file"
    if(type == "file" && body.content){
      fs.writeFileSync(completePath, body.content, "utf8")
    }
    if(body.name){
      fs.rename(completePath, path.join(basePath, topPath, body.name))
    }
    return res.json({ success : true})
  }catch(err){
    return res.status(400).json({err}) 
  }
};

// Delete
var delFileOrFolder = function (req, res, next) {
  var reqPath = decodeURI(url.parse(req.url).pathname)
  var topPath = path.dirname(reqPath)
  var name = path.basename(reqPath)
  var completePath = slash(path.join(basePath,reqPath))

  var body = req.body

  try{
    rimraf(completePath, ()=>{
      return res.json({ success : true})
    })
  }catch(err){
    return res.status(400).json({err}) 
  }
};

// Exec
var execute = function (req, res, next) {
  if(!req.body.command) {
    console.log("No command to execute")
    return res.json({success : false})
  } else {
    console.log("Executed command", req.body.command)
    exec(`cd ${path.join(basePath, req.body.path||"")} && `+req.body.command, (er, so, se)=>{
      console.log(er || so || se)
      if(er || se) return res.json({success : false})
      else return res.json({success : true})
    });
  }
};

module.exports = fileserver;

function filterFile(path){
  path = slash(path)
  if(!conf.exclusions || !conf.exclusions.length) return true
  for (let exp of conf.exclusions){
    let reg = new RegExp(exp)
    if(reg.test(path)) return false
  }
  return true
}
