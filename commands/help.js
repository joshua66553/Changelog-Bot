module.exports = {
    name: "commandName",
    async execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('This is the help msg.')
            .addFields({ name: 'Update', value: `Example is *${config.bot.prefix}update <What ever you changed in the server>*`, inline: false }, )
        message.channel.send(embed);
    },
};