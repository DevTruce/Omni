"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const fs = require("fs").promises;
const logger = require("../utils/logger.js");
const LAST_POST_DATES_FILE = "./json/lastPostDates.json";

///////////////////////////////////////////////////////////////////////////////
//////// Save RSS Feed URL:DATE || persisted data across server restarts
async function saveLastPostDates(lastPostDates) {
  try {
    // Save last post dates data to JSON file
    await fs.writeFile(
      LAST_POST_DATES_FILE,
      JSON.stringify(lastPostDates, null, 2),
      "utf8"
    );
    logger("info", "Last post dates for RSS feeds saved successfully");
    return lastPostDates; // needed in checkRSSFeed logic
  } catch (err) {
    logger("error", "Error saving lastPostDates", "", err);
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = saveLastPostDates;
