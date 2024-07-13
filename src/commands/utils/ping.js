"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");

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
      logger("error", `Failed to send pong`, "", err);

      // Inform the user about the error
      await interaction.reply({
        content: `Failed to send pong, Please try again later. \n\n${err}`,
        ephemeral: true,
      });
    }
  },
};
