'use strict';

const { Events } = require('discord.js');

module.exports = client => {
    client.on(Events.MessageCreate, async (msg) => {
        msg.send(msg.content);

        return;
    });
}