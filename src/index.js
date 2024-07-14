"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const fs = require("node:fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const config = require("./config.js");
const { loadCommands } = require("./utils/loadCommands");
const { loadEventListeners } = require("./utils/loadEventListeners");

///////////////////////////////////////////////////////////////////////////////
//////// Creating New Client Instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],

  // Options
  disableEveryone: false,
});

///////////////////////////////////////////////////////////////////////////////
//////// Creating Collections
client.commands = new Collection();
client.cooldowns = new Collection();

///////////////////////////////////////////////////////////////////////////////
//////// Loading Command Files
loadCommands(client);

///////////////////////////////////////////////////////////////////////////////
//////// Loading Event Files
loadEventListeners(client);

///////////////////////////////////////////////////////////////////////////////
//////// Log In To Discord
client.login(config.BOT_TOKEN);
