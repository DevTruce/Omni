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

  RSS_FEEDS: [
    {
      RSS_URL: process.env.RSS_REDDIT_PROGRAMMING_URL,
      CHANNEL_ID: process.env.RSS_REDDIT_PROGRAMMING_CHANNEL_ID,
    },
    {
      RSS_URL: process.env.RSS_CSS_TRICKS_URL,
      CHANNEL_ID: process.env.RSS_CSS_TRICKS_CHANNEL_ID,
    },
  ],
};

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = config;
