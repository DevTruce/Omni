"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");

const config = require("../../config.js");

///////////////////////////////////////////////////////////////////////////////
//////// Speak as Omni
module.exports = {
  cooldown: 0,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("omni")
    .setDescription("I am Omni")
    .addStringOption(option =>
      option
        .setName("content")
        .setDescription("Content of the message")
        .setRequired(true)
    ),
  async execute(interaction) {
    // User is not allowed to use this command
    if (interaction.user.id !== config.OWNER_ID) {
      logger("commandUseDenied", "", interaction, "");

      // Inform user
      return await interaction.reply({
        content: "You are not allowed to use this command",
        ephemeral: true,
      });
    }

    // User is allowed to use this command
    logger("commandUsed", "", interaction, "");
    const content = interaction.options.getString("content");
    try {
      // Complete interaction
      await interaction.reply(content);
    } catch (err) {
      // Log detailed error information for debugging
      logger("error", `Omni does not want to talk`, "", err);

      // Inform the user about the error
      await interaction.reply({
        content: `I dont want to talk, Please try again later. \n\n${err}`,
        ephemeral: true,
      });
    }
  },
};
