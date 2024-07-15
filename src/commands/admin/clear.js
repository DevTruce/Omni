"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");
const ephmeralResponse = require("../../helpers/ephemeralResponse.js");
const isAuthorizedUser = require("../../helpers/isAuthorizedUser.js");

const errorMessage = `There was an error while trying to delete messages.`;

///////////////////////////////////////////////////////////////////////////////
//////// Keep the chat clean when needed
module.exports = {
  cooldown: 0,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear messages from chat")
    .addStringOption(option =>
      option
        .setName("amount")
        .setDescription("How many messages do you want to clear?")
        .setRequired(true)
    ),
  async execute(interaction) {
    //// User is not allowed to use this command
    const authorized = await isAuthorizedUser(interaction, "owner");
    if (!authorized) return;

    //// User is allowed to use this command
    logger("commandUsed", "", interaction, "");
    const numberToDelete = parseInt(interaction.options.getString("amount"));

    // Make sure numberToDelete is valid
    if (numberToDelete <= 0 || numberToDelete > 500 || isNaN(numberToDelete)) {
      return await ephmeralResponse(
        interaction,
        "Please provide a number between 1 and 500 as the amount of messages to delete."
      );
    }

    try {
      // Fetch messages to delete
      const fetchedMessages = await interaction.channel.messages.fetch({
        limit: numberToDelete,
      });

      // Check if any messages were fetched
      if (!fetchedMessages.length > 0 || !fetchedMessages.length === null) {
        throw new Error("There are no messages to delete");
      }

      // Delete fetched messages in bulk
      await interaction.channel.bulkDelete(fetchedMessages, true);

      // Inform the user that messages have been deleted
      logger(
        "success",
        `Successfully deleted ${numberToDelete} messages from ${interaction.channel.name}`,
        "",
        ""
      );
      await ephmeralResponse(
        interaction,
        `Successfully deleted ${numberToDelete} messages.`
      );
    } catch (err) {
      // Log detailed error information for debugging
      logger("error", errorMessage, "", err);

      // Inform the user about the error
      await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
    }
  },
};
