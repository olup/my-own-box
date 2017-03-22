#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs-extra');
var path = require('path');
var yaml = require('js-yaml')
var fileserver = require('./fileserver.js');
var localtunnel = require('localtunnel');
var cluster = require('cluster');

// console related dep
var chalk = require("chalk")
var prompt = require('prompt');

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
    console.log( chalk.bgWhite.blue(` =============================== 
 MY OWN BOX - HOSTED MICRO CLOUD 
 =============================== 
`) )

    cluster.fork();

    cluster.on('exit', function(worker, code, signal) {
        if(code == 1) cluster.fork();
    });
}

if (cluster.isWorker) {

  // Loading conf file from root folder
    try {
        var fileConf = yaml.safeLoad(fs.readFileSync(path.join(conf.basePath,'conf.yml'), 'utf8'));
        Object.assign(conf, fileConf)
        startServer(conf)
    } catch (e) {
        fs.copySync(path.join(__dirname,'conf.yml'), path.join(conf.basePath, "conf.yml"))
        console.log(chalk.bgYellow('No config file found - We created one in your directory'));
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
    }
}