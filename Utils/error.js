const uuid = require('uuid');
const { EmbedBuilder } = require('discord.js');
const stack = require("error-stack-parser");
const { DiscordjsErrorCodes, DiscordAPIError } = require('discord.js');

module.exports = {
    // Error handling for commands
    // async errorHandle (error, client, interaction) {
    //     try {
    //         var errorID = uuid.v4();

    //         const config = client.config;
    //         const guild = await client.guilds.cache.get(config.bot.guildId);
    //         const errorChan = await guild.channels.cache.get(config.bot.errorChannelID);
    //         const supportServer = 'https://discord.gg/HczVhERKBa'

    //         error.stacks = error.stack;

    //         errorChan.send({
    //             content: '<@397971492924555264>',
    //             embeds: [
    //                 new EmbedBuilder()
    //                     .setColor(0xFF0000)
    //                     .setTitle(`Error: ${errorID}`)
    //                     .setDescription("```yml\n"+
    //                         `${error.stack}`
    //                     +"```")
    //                     .addFields(
    //                         { name: 'User', value: `${interaction.user.tag} (${interaction.user.id})` },
    //                         { name: 'Location', value: `\`${stack.parse(error)[0].fileName}:${stack.parse(error)[0].lineNumber}:${stack.parse(error)[0].columnNumber}\`` },
    //                         { name: 'Error ID', value: `${errorID}`}
    //                     )
    //                     .setTimestamp()
    //             ]
    //         });

    //         interaction.reply({
    //             embeds: [
    //                 new EmbedBuilder()
    //                     .setColor(0xFF0000)
    //                     .setTitle(`Error: ${errorID}`)
    //                     .setDescription(`${error}`)
    //                     .addFields(
    //                         { name: 'Support Server', value: `${supportServer}`},
    //                         { name: 'Error ID', value: `${errorID}`}
    //                     )
    //                     .setTimestamp()
    //             ]
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },

    // Error handling for collections
    async errorHandle(error, client, interaction) {
        try {
            var errorID = uuid.v4();

            const config = client.config;
            const guild = await client.guilds.cache.get(config.bot.guild);
            const errorChan = client.channels.cache.get(config.bot.errorChannelID)
            const supportServer = 'https://discord.gg/HczVhERKBa'

            error.stacks = error.stack;

            errorChan.send({
                content: '<@397971492924555264>',
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`Error: ${errorID}`)
                    .setDescription("```yml\n" +
                        `${error.stack}` +
                        "```")
                    .addFields({ name: 'User', value: `${interaction.user.tag} (${interaction.user.id})` }, { name: 'Location', value: `\`${stack.parse(error)[0].fileName}:${stack.parse(error)[0].lineNumber}:${stack.parse(error)[0].columnNumber}\`` }, { name: 'Error ID', value: `${errorID}` })
                    .setTimestamp()
                ]
            });

            interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`Error: ${errorID}`)
                    .setDescription(`${error}`)
                    .addFields({ name: 'Support Server', value: `${supportServer}` }, { name: 'Error ID', value: `${errorID}` })
                    .setTimestamp()
                ]
            });
        } catch (error) {
            console.log(error);
        }
    },

    // Error handling for non-commands
    async errorLog(error, client) {
        try {
            var errorID = uuid.v4();

            const config = client.config;
            const guild = client.guilds.cache.get(config.bot.guild);
            const errorChan = client.channels.cache.get(config.bot.errorChannelID)

            // const guild = await client.guilds.cache.get('897246974825361468');
            // const errorChan = await guild.channels.cache.get('1165501064037011506');
            const supportServer = 'https://discord.gg/HczVhERKBa'

            error.stacks = error.stack;

            // stack.parse(error)[0].fileName

            errorChan.send({
                content: '<@397971492924555264>',
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`Error: ${errorID}`)
                    .setDescription("```yml\n" +
                        `${error.stack}` +
                        "```")
                    .addFields({ name: 'Location', value: `\`${stack.parse(error)[0].fileName}:${stack.parse(error)[0].lineNumber}:${stack.parse(error)[0].columnNumber}\`` }, { name: 'Error ID', value: `${errorID}` })
                    .setTimestamp()
                ]
            });
        } catch (error) {
            console.log(error);
        }
    },

    // Error handling for mysql errors
    async mysqlHandle(error, client, interaction) {

        try {
            if (error instanceof TypeError) {
                error.name = 'TypeError';
            }

            var errorID = uuid.v4();

            const config = client.config;
            const guild = await client.guilds.cache.get(config.bot.guildId);
            const errorChan = await guild.channels.cache.get(config.bot.errorChannelID);
            const supportServer = 'https://discord.gg/HczVhERKBa'

            error.stacks = error.stack;

            errorChan.send({
                content: '<@397971492924555264>',
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`Mysql Error: ${errorID}`)
                    .setDescription("```yml\n" +
                        // trim error message to prevent long messages
                        `${error.name}`
                        // `${error.stack.substring(0, 76)}\n` +
                        // `${error.stack.substring(1535, 1645)}`
                        // `${error.stack}`
                        +
                        "```")
                    .addFields({ name: 'User', value: `${interaction.user.tag} (${interaction.user.id})` }, { name: 'Location', value: `\`${stack.parse(error)[12].fileName}:${stack.parse(error)[12].lineNumber}:${stack.parse(error)[12].columnNumber}\`` }, { name: 'Error ID', value: `${errorID}` })
                    .setTimestamp()
                ]
            });

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`Mysql Error: ${errorID}`)
                    .setDescription(`${error}`)
                    .addFields({ name: 'Support Server', value: `${supportServer}` }, { name: 'Error ID', value: `${errorID}` })
                    .setTimestamp()
                ]
            });
        } catch (error) {
            console.log(error);
        }
    }
}