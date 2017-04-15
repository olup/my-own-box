#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs-extra');
var path = require('path');
var yaml = require('js-yaml')
var fileserver = require('./fileserver.js');

// tunnel specific dep
var request = require('request');
var ngrok = require('ngrok');

// console related dep
var chalk = require("chalk")
var prompt = require('prompt');

// configuration object
var conf = {
    basePath : process.cwd(),
    subPath : "",
    apiPort : 4444,
    localtunnel : true,
    jwtSecret : "BigFuckingSecret",
    client : true,
    exclusions : []
}

    console.log( chalk.bgWhite.blue(` =============================== 
 MY OWN BOX - HOSTED MICRO CLOUD 
 =============================== 
`) )

  // Loading conf file from root folder
    try {
        var fileConf = yaml.safeLoad(fs.readFileSync(path.join(conf.basePath,'conf.yml'), 'utf8'));
        Object.assign(conf, fileConf)
        startServer(conf)
    } catch (e) {
        console.log(e)
        if(e.code == "ENOENT"){
            fs.copySync(path.join(__dirname,'conf.yml'), path.join(conf.basePath, "conf.yml"))
            console.log(chalk.bgYellow('No config file found - We created one in your directory'));
        }else{
            console.log(chalk.bgRed("There was an error while reading your config file. Please make sure you wrote correct YAML"));
        }
        prompt.start()
        prompt.get({
            properties: {
                // setup the dialog
                confirm: {
                    // allow yes, no, y, n, YES, NO, Y, N as answer
                    pattern: /^(yes|no)$/gi,
                    description: 'Should we start the box anyway using default (say no to edit your conf.yml first)',
                    message: 'Type yes/no',
                    required: true,
                    default: 'no'
                }
            }
        } ,(err, res)=>{
            if (err || res == "yes") startServer(conf)
            else process.exit()
        })
    }


function startTunnel(){
    var interval
    ngrok.connect(conf.apiPort, (err, url) => {
            if(err) console.log(err)
            else {
                // request.post(
                //     'http://api.quatrieme-gauche.ga/register',
                //     { json: { url : url.replace("https","http"), domain : conf.domain } },
                //     function (error, response, body) {
                //         if (!error && response.statusCode == 200) {
                //             console.log(chalk.bgWhite.green("Tunnel registered at", body.redirect.domain+".quatrieme-gauche.ga"))
                //         }
                //     }
                // )
                console.log(chalk.bgWhite.green("Tunnel registered at", url))

            }
    })
}

function startServer(conf){
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
        ngrok.once('disconnect', startTunnel )
        ngrok.once('error', startTunnel )
    }
}

// check if tunnel is still on - localtunnel.me is very unstable
// function pingTunnel(tunnel){
//     https.get(tunnel.url+"/api/health-check", function (res) {
//         if (res.statusCode != 200) {
//             console.log(chalk.bgRed("The tunnel doesn't seem to be online - restarting"))
//             tunnel.close()
//         }
//     }).on('error', function(e) {
//         console.log(e)
//         tunnel.close()
//     });;
// }