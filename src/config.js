"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
require("dotenv").config();

///////////////////////////////////////////////////////////////////////////////
//////// Config File Information Pulled from .env File
const config = {
  OWNER_ID: process.env.OWNER_ID || "",

  BOT_TOKEN: process.env.BOT_TOKEN || "",
  BOT_APP_ID: process.env.BOT_APP_ID || "",
  GUILD_ID: process.env.GUILD_ID || "",
  TIMEOUT_INTERVAL: process.env.TIMEOUT_INTERVAL || 5000,

  NINJAS_API_URL: process.env.NINJAS_API_URL || "",
  NINJAS_API_KEY: process.env.NINJAS_API_KEY || "",
};

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = config;
