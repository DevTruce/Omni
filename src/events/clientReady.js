"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { Events, PresenceUpdateStatus, ActivityType } = require("discord.js");

///////////////////////////////////////////////////////////////////////////////
//////// Event Listener for Message Creation
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      await client.user.setActivity("You", { type: ActivityType.Watching });
      await client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
    } catch (err) {
      console.log(`Failed to set bot status: ${err.message}`);
    }
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
