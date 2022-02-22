const fs = require('fs');
const config = require('../config.js');

module.exports = {
    name: 'update',
    description: 'A command.',
    async execute(client, message, args, Discord, con) {
        const per = config.permissions.staffperms
        if (message.member.roles.cache.some(h => per.includes(h.id))) {
            if (!args[0]) {
                message.channel.send("You have to input something for me to say...").then(msg => {
                    msg.delete({ timeout: 8000 }).catch(e => { if (config["bot"].debugmode) return console.log(e); })
                    message.delete().catch(e => { if (config["bot"].debugmode) return console.log(e); })
                });
            } else {
                const sayEmbed = new Discord.MessageEmbed()
                    .setTitle(`Server Changelog from ${message.author.username}`)
                    .setDescription(args.join(" "))
                    .setThumbnail(`${config.bot.logo}`)
                    .setTimestamp()
                    .setColor(`${config.bot.color}`)
                    .setFooter(`${config["bot"].copyright}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                message.channel.send(sayEmbed)
                message.delete().catch(e => { if (config["bot"].debugmode) return console.log(e); });
            }
        } else {
            message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {
                if (config["bot"].debugmode) return
                console.log(e);
            })
            message.delete().catch(e => { if (config["bot"].debugmode) return console.log(e); });
        }
    },
};