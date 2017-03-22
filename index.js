#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml')
var fileserver = require('./fileserver.js');
var localtunnel = require('localtunnel');
var cluster = require('cluster');
var chalk = require("chalk")

// configuration object
var conf = {
    basePath : process.cwd(),
    subPath : "",
    apiPort : 3000,
    localtunnel : true,
    jwtSecret : "BigFuckingSecret",
    client : true
}

if (cluster.isMaster) {
    console.log( chalk.blue(`                 _
              (\`  ).                   _
             (     ).              .:(\`  )\`.
)           _(       '\`.          :(   .    )
        .=(\`(      .   )     .--  \`.  (    ) )
       ((    (..__.:'-'   .+(   )   \` _\`  ) )
\`.     \`(       ) )       (   .  )     (   )  ._
  )      \` __.:'   )     (   (   ))     \`-'.-(\`  )
)  )  ( )       --'       \`- __.'         :(      ))
.-'  (_.'          .')                    \`(    )  ))
                  (_  )                     \` __.:'

--..,___.--,--'\`,---..-.--+--.,,-,,..._.--..-._.-a:f--.


`) )

  cluster.fork();

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {

  // Loading conf file from root folder
    try {
    var fileConf = yaml.safeLoad(fs.readFileSync(path.join(conf.basePath,'conf.yml'), 'utf8'));
    Object.assign(conf, fileConf)
    } catch (e) {
    console.log(chalk.bgYellow('No config file found - using default'));
    }

    // Starting script
    console.log(chalk.bgGreen("Starting from ", path.join(conf.basePath, conf.subPath)))
    console.log(chalk.bgGreen(`starting API server on port ${conf.apiPort}`))

    // Starting server
    fileserver(app, conf);

    // Starting client SPA app if wanted
    if(conf.client) {
        var publicPath = path.resolve(__dirname, './client')
        app.use('/client', express.static(publicPath));
        app.all('/*', (req, res) => res.sendFile('./index.html', {root: publicPath}) )
    }

    app.listen(conf.apiPort);

    if(conf.localtunnel){
        startTunnel()
    }
}


function startTunnel(){
    var tunnel = localtunnel(conf.apiPort, {subdomain : conf.domain}, function(err, tunnel) {
        if (err) {
            console.log(chalk.bgRed("local tunnel couldn't run - restarting"), JSON.stringify(err))
            process.exit(1)
        }
        else console.log(chalk.bgGreen("Local tunnel running on "+tunnel.url))
    });

    tunnel.on('close', function() {
        console.log("Localtunnel is now disconnected")
        process.exit(1)
    });

    tunnel.on('error', function() {
        console.log(chalk.bgRed("Localtunnel is now disconnected - restarting"))
        tunnel.close()
    });
}

