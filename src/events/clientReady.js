"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { Events, PresenceUpdateStatus, ActivityType } = require("discord.js");
const logger = require("../utils/logger");

///////////////////////////////////////////////////////////////////////////////
//////// Event Listener for Message Creation
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      await client.user.setUsername("Omni");
      await client.user.setActivity("You", { type: ActivityType.Watching });
      await client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
    } catch (err) {
      logger("error", "Failed to set bot status", "", err);
    }
    logger("info", `${client.user.tag} bot is online!`, "", "");
  },
};
