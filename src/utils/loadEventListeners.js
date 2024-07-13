"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const fs = require("node:fs");
const path = require("node:path");

///////////////////////////////////////////////////////////////////////////////
//////// Grabbing & Loading All Event Listeners Files
function loadEventListeners(client) {
  const eventsPath = path.join(__dirname, "..", "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { loadEventListeners };
