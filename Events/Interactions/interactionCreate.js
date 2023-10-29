const { InteractionType } = require("discord.js")
const { errorLog } = require("../../Utils/error.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        try {
            // SELECT MENUS
            if (interaction.isStringSelectMenu()) {

                console.log(interaction.customId)

                const selectMenu = client.selectmenus.get(interaction.customId);

                console.log(selectMenu)

                await selectMenu.execute(interaction, client)
            }

            // Buttons
            if (interaction.isButton()) {

                const button = client.buttons.get(interaction.customId);

                await button.execute(interaction, client)
            }

            // ContextMenu
            if (interaction.isContextMenuCommand()) {
                const contextCommand = client.commands.get(interaction.commandName);

                if (!contextCommand) return interaction.reply({ content: "This context menu has not refreshed" });

                await contextCommand.execute(interaction, client)
            }

            // COMMANDS
            if (!interaction.isChatInputCommand()) return;

                const command = client.commands.get(interaction.commandName);

                if (!command) return interaction.reply({ content: "This command has not refreshed" });

                await command.execute(interaction, client);
                // command.run(interaction, client)
        } catch (error) {
            console.log(error)
        }
    }
}