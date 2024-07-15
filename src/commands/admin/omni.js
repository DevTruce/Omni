"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");
const ephmeralResponse = require("../../helpers/ephemeralResponse.js");
const isAuthorizedUser = require("../../helpers/isAuthorizedUser.js");

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
    //// User is not allowed to use this command
    const authorized = await isAuthorizedUser(interaction, "owner");
    if (!authorized) return;

    //// User is allowed to use this command
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
