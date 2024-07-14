"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");
const ephmeralResponse = require("../../helpers/ephemeralResponse.js");

const config = require("../../config");

const errorMessage = `There was an error while trying to use the dad jokes command`;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch a random dad joke from ninjas dad joke api
module.exports = {
  cooldown: 60,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("dad-jokes")
    .setDescription("My father once said!"),
  async execute(interaction) {
    logger("commandUsed", "", interaction, "");
    try {
      // Make api request
      logger(
        "request",
        "Fetching random dad joke from ninjas dad jokes api",
        "",
        ""
      );
      const response = await fetch(`${config.NINJAS_API_URL}/dadjokes`, {
        method: "GET",
        contentType: "application/json",
        headers: { "X-Api-Key": config.NINJAS_API_KEY },
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      // Storing the response
      const data = await response.json();
      const dadJoke = data[0]?.joke;

      // Check if there indeed was a dad joke returned
      if (!dadJoke) {
        throw new Error("No dad joke found in response");
      }

      // Reply with the fetched dad joke to the user
      logger(
        "success",
        `Fetched random dad joke from ninjas dad jokes api`,
        "",
        ""
      );
      await interaction.reply(dadJoke);
    } catch (err) {
      // Log detailed error information for debugging
      logger("error", errorMessage, "", err);

      // Inform the user about the error
      await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
    }
  },
};
