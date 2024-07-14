"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");
const ephmeralResponse = require("../../helpers/ephemeralResponse.js");

const config = require("../../config");

const errorMessage = `There was an error while trying to use the jokes command`;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch a random joke from ninjas joke api
module.exports = {
  cooldown: 60,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("jokes")
    .setDescription("Laugh a little!"),
  async execute(interaction) {
    logger("commandUsed", "", interaction, "");
    try {
      // Make api request
      logger("request", "Fetching random joke from ninjas jokes api", "", "");
      const response = await fetch(`${config.NINJAS_API_URL}/jokes`, {
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
      const joke = data[0]?.joke;

      // Check if there indeed was a joke returned
      if (!joke) {
        throw new Error("No joke found in response");
      }

      // Reply with the fetched joke to the user
      logger("success", `Fetched random joke from ninjas jokes api`, "", "");
      await interaction.reply(joke);
    } catch (err) {
      // Log detailed error information for debugging
      logger("error", errorMessage, "", err);

      // Inform the user about the error
      await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
    }
  },
};
