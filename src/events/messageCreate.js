"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const config = require("../config");
const logger = require("../utils/logger");

///////////////////////////////////////////////////////////////////////////////
//////// Event Listener for Message Creation
module.exports = {
  name: "messageCreate",
  once: false,

  async execute(message) {
    if (message.author.bot) return; // ignore bot messages

    if (!message.content) {
      logger(
        "discordAction",
        `${message.author.tag} sent an image in ${message.channel.name}`
      );
    }

    if (message.content) {
      logger(
        "discordAction",
        `${message.author.tag} said ${message.content} in ${message.channel.name}`
      );
    }
  },
};
