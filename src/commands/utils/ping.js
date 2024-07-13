"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");

///////////////////////////////////////////////////////////////////////////////
//////// Speak as Bot
module.exports = {
  cooldown: 0,
  category: "utils",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
