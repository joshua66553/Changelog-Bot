const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { errorLog, errorHandle } = require('../../Utils/error');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Send a update message to a certian channel.'),
    async execute(interaction, client) {
        try {
            const Config = client.config;

            const modal = new ModalBuilder()
            .setCustomId('modal_changelog')
            .setTitle('Creating A Changelog:');

            // const Title_Text_Input = new TextInputBuilder()
            //     .setCustomId('modal_titleVarible')
            //     .setLabel("What you want the changelog title to be")
            //     .setStyle(TextInputStyle.Short)
            //     .setRequired(true);

            const Description_Text_Input = new TextInputBuilder()
                .setCustomId('modal_descriptionVarible')
                .setLabel("What you want the changelog description to be")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            const descriptionActionRow = new ActionRowBuilder()
                .addComponents(Description_Text_Input);

            modal.addComponents(descriptionActionRow);

            await interaction.showModal(modal).catch(() => { });
        } catch (error) {
            if (error.name === "TypeError") return errorLog(error, client);
            else if (error.name === 'Error') errorHandle(error, client, interaction)
        }
    }
}