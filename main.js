const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const config = require('./config');
const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag)
    setInterval(async() => {
        const guild = await client.guilds.fetch(`${config.bot.guild}`, true, true);
        const newActivity = `over ${guild.memberCount - 7} members.`;
        client.user.setActivity(newActivity, { type: 'WATCHING' });
    }, 10000);
})

client.on("guildMemberAdd", member => {
    setInterval(async() => {
        const guild = await client.guilds.fetch(`${config.bot.guild}`, true, true);
        const newActivity = `over ${guild.memberCount - 7} members.`;
        client.user.setActivity(newActivity, { type: 'WATCHING' });
    }, 10000);
})

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