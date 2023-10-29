const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require("discord.js");
const config = require("./Config.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates, DirectMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, Channel } = Partials;
const { startupScreen } = require("./Utils/boot")
const ms = require("ms");

class Jipy extends Client {
    constructor(options = {}) {
        super(options);

        this.config = require(`./Config.js`);
    };
};

const client = new Jipy({
    intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates, DirectMessages, MessageContent],
    partials: [User, Message, GuildMember, Channel]
})

startupScreen(config, ms);

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

client.commands = new Collection();
client.selectmenus = new Collection();
client.buttons = new Collection();
client.login(config.bot.token).then(() => {
    loadEvents(client)
    loadCommands(client)
});