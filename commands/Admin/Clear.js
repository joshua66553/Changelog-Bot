const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear messages in a channel.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The number of messages to clear.')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: 1 },
                    { name: '2', value: 2 },
                    { name: '3', value: 3 },
                    { name: '4', value: 4 },
                    { name: '5', value: 5 },
                    { name: '10', value: 10 },
                    { name: '25', value: 25 },
                    { name: '50', value: 50 },
                    { name: '100', value: 100 },
                )
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount <= 0) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Please enter a valid number`)
                        .setColor('Red')
                ]
            });
        }

        if (amount > 100) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`You can only clear 100 messages at a time.`)
                        .setColor('Red')
                ]
            });
        }

        await interaction.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`There was an error trying to clear messages in this channel.`)
                        .setColor('Red')
                ]
            });
        });

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Cleared ${amount} messages.`)
                    .setColor('Green')
            ]
        }).then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        });
    },
};
