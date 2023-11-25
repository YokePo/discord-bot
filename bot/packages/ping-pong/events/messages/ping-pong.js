'use strict';

const { Events } = require('discord.js');

module.exports = client => {
    client.on(Events.MessageCreate, async msg => {
        if (msg.author.bot) return;

        await msg.channel.send(msg.content);
    });
}