"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const { SlashCommandBuilder } = require("discord.js");

///////////////////////////////////////////////////////////////////////////////
//////// Speak as Bot
module.exports = {
  cooldown: 5,
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Send a message as bot")
    .addStringOption(option =>
      option
        .setName("content")
        .setDescription("Content of the message")
        .setRequired(true)
    ),
  async execute(interaction) {
    const content = interaction.options.getString("content");
    try {
      await interaction.reply(content);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
};
