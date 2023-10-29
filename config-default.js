const config = {

    bot: {
        token: "fill in your bot token here",
        debug_mode: true,
        color: "#32a877",
        status: "Do /Update", // Discord status message (Update the status type in ready.js line 15)
        logo: "not uesd anymore",
        guild: "fill in your guild id here",
        errorChannelID: "fill in your channel id here",
        copyright: "Ghosted RolePlay"
    },

    permissions: {
        staffperms: ["fill in your role id here", "fill in your role id here"]
    },

    presence_config: {
        use_mem: false,

        preschangetimer: "10000",

        presname1: "This Server",
        prestype1: 3,
        presstatus1: "dnd",

        presname2: "The Door",
        prestype2: 3,
        presstatus2: "dnd",

        presname3: "You Get Beamed",
        prestype3: 3,
        presstatus3: "dnd"
    }
}

module.exports = config