const { EmbedBuilder, SlashCommandBuilder, ApplicationCommandType } = require('discord.js');
const { errorLog } = require('../../Utils/error');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Change the settings of the bot'),
    async execute(interaction, client) {
        try{
            interaction.reply({
                content: 'This command is currently under development.',
            })
        } catch (error) {
            if (error.name === 'TypeError') return errorLog(error, client);
            else if (error.name === 'Error') errorHandle(error, client, interaction)
        }
    }
}