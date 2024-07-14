"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../utils/logger.js");
const ephmeralResponse = require("../../helpers/ephemeralResponse.js");

const config = require("../../config");

const errorMessage = `There was an error while trying to use the facts command`;

///////////////////////////////////////////////////////////////////////////////
//////// Fetch a random fact from ninjas fact api
module.exports = {
  cooldown: 60,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("facts")
    .setDescription("Learn something new!"),
  async execute(interaction) {
    logger("commandUsed", "", interaction, "");
    try {
      // Make api request
      logger("request", "Fetching random fact from ninjas facts api", "", "");
      const response = await fetch(`${config.NINJAS_API_URL}/facts`, {
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
      const fact = data[0]?.fact;

      // Check if there indeed was a fact returned
      if (!fact) {
        throw new Error("No fact found in response");
      }

      // Reply with the fetched fact to the user
      logger("success", `Fetched random fact from ninjas facts api`, "", "");
      await interaction.reply(fact);
    } catch (err) {
      // Log detailed error information for debugging
      logger("error", errorMessage, "", err);

      // Inform the user about the error
      await ephmeralResponse(interaction, `${errorMessage} \n\n${err}`);
    }
  },
};
