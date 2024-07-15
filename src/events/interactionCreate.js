"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { Events } = require("discord.js");
const logger = require("..//utils/logger.js");
const ephmeralResponse = require("../helpers/ephemeralResponse.js");

const errorMessage = `There was an error while executing this command!`;

///////////////////////////////////////////////////////////////////////////////
//////// Event Listener for Interaction Creation
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Stop execution if the interaction is NOT a slash command
    if (!interaction.isChatInputCommand()) return;

    // Retrieve command obj from client's command collection
    const command = interaction.client.commands.get(interaction.commandName);

    // Stop execution if the command does not exist in command collection
    if (!command) {
      logger(
        "error",
        `No command matching ${interaction.commandName} was found.`,
        "",
        err
      );

      return;
    }

    // Execute the command
    try {
      await command.execute(interaction);
    } catch (err) {
      // Log detailed error information for debugging
      logger("error", errorMessage, "", err);

      if (interaction.replied || interaction.deferred) {
        // Inform the user about the error
        await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
      } else {
        // Inform the user about the error
        await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
      }
    }
  },
};
