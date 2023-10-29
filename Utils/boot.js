const axios = require('axios')
const colors = require('colors/safe')
const figlet = require(`figlet`);
const carden = require(`carden`);
const fs = require("fs");
const harddata = require('./dadata.json')
const signale = require('signale');
const express = require('express');
const app = express();
const {
    join
} = require('path');


module.exports = {

        async startupScreen(config, ms, client) {

            try {

                var operating;
                var djsVer = require(`discord.js`).version;
                // Discord.js Version: ${djsVer}\n

                if (process.platform == "aix") operating = "IBM AIX";
                if (process.platform == "darwin") operating = "Apple Darwin";
                if (process.platform == "freebsd") operating = "FreeBSD";
                if (process.platform == "linux") operating = "Linux/Linux Distro";
                if (process.platform == "openbsd") operating = "OpenBSD";
                if (process.platform == "sunos") operating = "SunOS";
                if (process.platform == "win32") operating = "Windows";
                else platform = "Unknown";
                figlet.text(`${harddata.main.name}`, {
                            width: '500 '
                        }, async function(err, head) {
                            if (err) return;

                            var nodeVer = process.version;

                            if (Number(process.version.slice(1).split(".")[0] < 13)) nodeVer = process.version + colors.red(` (Consider Updating)`);

                            var consoleArt = carden(colors.blue(head), colors.white(`((Default)\nCreated By: ${colors.blue(`JipyTheDev#0001`)}\n\nOperating System: ${operating}\nProcess PID: ${process.pid}\nNode Version: ${nodeVer}\nDiscord.JS Version: ${djsVer}\nDebug Mode: ${colors.yellow(config.bot.debugmode)}\n\nSupport available at ${colors.blue(`${harddata.main.support}`)}\nMade By ${colors.america('JipyTheDev')}`), {
                    margin: 1,
                    content: {
                        borderStyle: 'single',
                        backgroundColor: "black",
                        borderColor: "blue",
                        padding: 1
                    },
                    header: {
                        borderStyle: 'classic',
                        backgroundColor: "black",
                        padding: 1
                    }
                });

                console.log(consoleArt);

                // signale.API(`Listening on port http://localhost:${config.site.port}`)

                signale.success('------ CONSOLE LOGGING BEGINS BELOW ------')

                if (config.bot.debugmode) {
                    signale.success(`-------- DEBUG MODE SERVER LOGGER --------`)
                }

            })
        } catch (e) {
            if (config["site"].debugmode) return signale.fatal(e);
        }
    }
}