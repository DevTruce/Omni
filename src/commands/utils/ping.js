"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");
const ephmeralResponse = require("../../helpers/ephemeralResponse.js");

const errorMessage = `There was an error while trying to use the ping command`;

///////////////////////////////////////////////////////////////////////////////
//////// Speak as Bot
module.exports = {
  cooldown: 0,
  category: "utils",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong"),
  async execute(interaction) {
    logger("commandUsed", "", interaction, "");
    try {
      await interaction.reply("Pong!");
    } catch (err) {
      // Log detailed error information for debugging
      logger("error", errorMessage, "", err);

      // Inform the user about the error
      await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
    }
  },
};
