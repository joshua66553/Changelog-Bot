const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const config = require('./config');
const fs = require('fs');
const signale = require('signale');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
    try {
        signale.success('Logged in as ' + client.user.tag)
    } catch {}
    if (config.presence_config.use_mem) {
        setInterval(async() => {
            const guild = await client.guilds.fetch(`${config.bot.guild}`, true, true);
            const newActivity = `over ${guild.memberCount - 7} members.`;
            client.user.setActivity(newActivity, { type: 'WATCHING' });
        }, 10000);
    } else {
        let statuses = [{
                activity: {
                    name: `${config["presence_config"].presname1}`,
                    type: `${config["presence_config"].prestype1}`
                },
                status: `${config["presence_config"].presstatus1}`
            },
            {
                activity: {
                    name: `${config["presence_config"].presname2}`,
                    type: `${config["presence_config"].prestype2}`
                },
                status: `${config["presence_config"].presstatus2}`
            },
            {
                activity: {
                    name: `${config["presence_config"].presname3}`,
                    type: `${config["presence_config"].prestype3}`
                },
                status: `${config["presence_config"].presstatus3}`
            }
        ];

        let i = 0;
        setInterval(() => {
            let status = statuses[i];
            if (!status) {
                status = statuses[0];
                i = 0;
            }
            client.user.setPresence(status);
            i++;
        }, config["presence_config"].preschangetimer);
    }
})

if (config.presence_config.use_mem === true) {
    client.on("guildMemberAdd", member => {
        setInterval(async() => {
            const guild = await client.guilds.fetch(`${config.bot.guild}`, true, true);
            const newActivity = `over ${guild.memberCount - 7} members.`;
            client.user.setActivity(newActivity, { type: 'WATCHING' });
        }, 10000);
    })
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;
    const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(client, message, args, Discord, config)
    } catch (e) {
        console.log(e)
        message.reply('There was an error.')
    }
})

client.on('error', console.error);
client.on('warn', console.warn);

client.login(config.bot.token);