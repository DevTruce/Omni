"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { Events, PresenceUpdateStatus, ActivityType } = require("discord.js");
const logger = require("../utils/logger.js");
const checkRSSFeed = require("../utils/checkRSSFeed.js");

const config = require("../config.js");

///////////////////////////////////////////////////////////////////////////////
//////// Event Listener for Message Creation
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    //// Setting Omni's initial values
    try {
      await client.user.setUsername("Omni");
      await client.user.setActivity("You", { type: ActivityType.Watching });
      await client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
    } catch (err) {
      logger("error", "Failed to set bot status", "", err);
    }
    logger("info", `${client.user.tag} bot is online!`, "", "");

    //// Handling RSS Feeds
    // Check RSS Feed when the bot goes online
    await checkRSSFeed(client);

    // Check the RSS Feed every 5 minutes
    setInterval(
      async () => await checkRSSFeed(client),
      config.RSS_TIMEOUT_INTERVAL
    );
  },
};
