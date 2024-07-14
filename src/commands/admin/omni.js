"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");
const ephmeralResponse = require("../../helpers/ephemeralResponse.js");

const config = require("../../config.js");

const errorMessage = `There was an error while trying to use the omni command`;

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
      return await interaction
        .reply({
          content: "You are not allowed to use this command",
          ephemeral: true,
        })
        .then(msg => {
          setTimeout(() => msg.delete(), config.TIMEOUT_INTERVAL);
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
      logger("error", errorMessage, "", err);

      // Inform the user about the error
      await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
    }
  },
};
