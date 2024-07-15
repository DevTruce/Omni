"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
require("dotenv").config();

///////////////////////////////////////////////////////////////////////////////
//////// Config File Information Pulled from .env File
const config = {
  TIMEOUT_INTERVAL: 5000, // 5 seconds
  // RSS_TIMEOUT_INTERVAL: 300000, // 5 minutes
  RSS_TIMEOUT_INTERVAL: 5000, // for testing

  ///////////////////////////////////////
  ////  Discord Application Setup  /////
  BOT_TOKEN: process.env.BOT_TOKEN || "",
  BOT_APP_ID: process.env.BOT_APP_ID || "",
  GUILD_ID: process.env.GUILD_ID || "",

  /////////////////////////////
  ////  Authorized Users  /////
  OWNER_ID: process.env.OWNER_ID || "",

  /////////////////////////////
  ////  API Information  /////
  NINJAS_API_URL: process.env.NINJAS_API_URL || "",
  NINJAS_API_KEY: process.env.NINJAS_API_KEY || "",

  //////////////////////////////////
  ////  RSS Feed Information  /////
  RSS_FEEDS: [
    //// Group project repos [main branch]
    // Omni
    {
      RSS_URL: "https://github.com/DevTruce/Omni/commits/main/.atom",
      CHANNEL_ID: process.env.RSS_GITHUB_CHANNEL_ID,
    },

    //// Programming news
    // freeCodeCamp
    {
      RSS_URL: "https://www.freecodecamp.org/news/rss/",
      CHANNEL_ID: process.env.RSS_NEWS_CHANNEL_ID,
    },
    // Dev.to
    {
      RSS_URL: "https://dev.to/feed",
      CHANNEL_ID: process.env.RSS_NEWS_CHANNEL_ID,
    },
    // CSS Tricks
    {
      RSS_URL: "https://css-tricks.com/feed/",
      CHANNEL_ID: process.env.RSS_NEWS_CHANNEL_ID,
    },
    // Smashing Magazine
    {
      RSS_URL: "https://www.smashingmagazine.com/feed/",
      CHANNEL_ID: process.env.RSS_NEWS_CHANNEL_ID,
    },
    // SitePoint
    {
      RSS_URL: "https://www.sitepoint.com/feed/",
      CHANNEL_ID: process.env.RSS_NEWS_CHANNEL_ID,
    },
  ],
};

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = config;
