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
                    .setTitle('Server Changelog')
                    .setDescription(args.join(" "))
                    .setThumbnail('https://cdn.discordapp.com/attachments/873028975503478824/936845464471490590/4.0logonobackground.png')
                    .setTimestamp()
                    .setFooter(`${config["bot"].copyright}`, `${message.author.displayAvatarURL({dynamic: true})}`)

                message.channel.send(sayEmbed)
                message.delete().catch(e => { if (config["bot"].debugmode) return console.log(e); });
            }


        } else {
            message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => { if (config["bot"].debugmode) return console.log(e); })
            message.delete().catch(e => { if (config["bot"].debugmode) return console.log(e); });
        }
    },
};