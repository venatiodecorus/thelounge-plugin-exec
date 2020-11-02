"use strict";

//const Msg = require("thelounge/src/models/msg");
//const log = require("thelounge/src/log");
//const Helper = require("thelounge/src/helper");
//const Utils = require("thelounge/src/command-line/utils");
//const fs = require("fs");
//const path = require('path');
const { exec } = require("child_process");

let thelounge = null;
let stop = false;
let burst = 5;
let perSec = 200;

const execCommand = {
    input: function (client, target, command, args) {
        if (args.length === 0) {
            client.sendMessage("Usage: /exec <command|--stop|--set-rate <burst> <per-sec>>", target.chan);
            return;
        }

        switch(args[0]) {
            case "--stop":
                stop = true;
                return
            break;
            case "--set-rate":
                burst = args[1];
                perSec = args[2];
                break;
            default:
                exec(args.join(' '), (error, stdout, stderr) => {
                    if(error) {
                        client.sendMessage(`error: ${error.message}`, target.chan);
                        return
                    }
                    if(stderr) {
                        client.sendMessage(`stderr: ${stderr}`, target.chan);
                        return;
                    }

                    // Get first burst amount of lines
                    let burstText = stdout.trim().split(/[\r?\n]+/, burst);
                    for(var i = 0; i < burst && i < burstText.length; i++) {
                        client.runAsUser(burstText[i], target.chan.id);
                    }
        
                    let restText = stdout.trim().split(/[\r?\n]+/);
                    restText = restText.splice(burst, restText.length-1);
                    
                    if(restText.length == 0)
                        return;

                    var it = 0;
                    var intObj = setInterval(() => {
                        client.runAsUser(restText[it++], target.chan.id);
                        if(stop || it == restText.length) {
                            stop = false;
                            it = 0;
                            clearInterval(intObj);
                        }
                    }, perSec)
                });
            break;
        }
    },
    allowDisconnected: true
};

module.exports = {
    onServerStart: api => {
        thelounge = api;
        thelounge.Commands.add("exec", execCommand);
    },
};
