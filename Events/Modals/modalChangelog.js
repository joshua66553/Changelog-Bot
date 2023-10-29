const { InteractionType, EmbedBuilder } = require('discord.js')
const { errorLog } = require('../../Utils/error')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        try {
            if(interaction.type !== InteractionType.ModalSubmit) return;
            if(interaction.customId !== 'modal_changelog') return;
            const config = client.config;
            const description = interaction.fields.getTextInputValue('modal_descriptionVarible');
            const guild = interaction.guild;

            if (interaction.member.nickname) {
                var member = interaction.member.nickname
            } else {
                var member = interaction.member.user.globalName
            }

            const author = {
                name: member,
                iconURL: interaction.member.user.avatarURL()
            }

            const embed = new EmbedBuilder()
                .setTitle(`Server Changelog`)
                .setDescription(description)
                .setColor('#01D3AC')
                .setAuthor(author)
                .setThumbnail(guild.iconURL())
                .setFooter({ text: 'Made By Jipsy' })
                .setTimestamp();

            const ChangelogChan = guild.channels.cache.get('945396202671841350');

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Changelog')
                        .setDescription('Sent a changelog to the changelog channel.')
                ]
            });

            await ChangelogChan.send({ embeds: [embed] });
        } catch (error) {
            errorLog(error, client)
        }
    }
}