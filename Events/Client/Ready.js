const signale = require("signale")
const { ActivityType } = require("discord.js")
const { errorHandle, errorLog } = require('../../Utils/error');

module.exports = {
    name: "ready",
    async execute(interaction, client) {
        const config = client.config;
        try {
            if (config.presence_config.use_mem) {
                client.user.setPresence({
                    activities: [{
                        name: config.bot.status,
                        type: ActivityType.Watching
                    }],
                    status: 'dnd'
                })
            } else {
                let statuses = [
                    {
                        activities: [{
                            name: `${config["presence_config"].presname1}`,
                            type: config["presence_config"].prestype1
                        }],
                        status: `${config["presence_config"].presstatus1}`
                    },
                    {
                        activities: [{
                            name: `${config["presence_config"].presname2}`,
                            type: config["presence_config"].prestype2
                        }],
                        status: `${config["presence_config"].presstatus2}`
                    },
                    {
                        activities: [{
                            name: `${config["presence_config"].presname3}`,
                            type: config["presence_config"].prestype3
                        }],
                        status: `${config["presence_config"].presstatus3}`
                    }
                ];

                let i = 0
                setInterval(() => {
                    let status = statuses[i]
                    if (!status) {
                        status = statuses[0]
                        i = 0
                    }
                    client.user.setPresence(status)
                    i++
                }, config["presence_config"].preschangetimer)
            }
            // client.user.setActivity(config.bot.status, { type: ActivityType.Watching })
            signale.success("Bot is online")

        } catch (e) {
            if (e.name === "TypeError") return errorLog(e, client, interaction);
            else if (e.name === 'Error') errorHandle(e, client, interaction)
        }
    }
}