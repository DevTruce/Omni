"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const fs = require("fs").promises;
const logger = require("../utils/logger.js");

const LAST_POST_DATES_FILE = "./json/lastPostDates.json";

///////////////////////////////////////////////////////////////////////////////
//////// Load RSS Feed URL:DATE || persisted data across server restarts
async function loadLastPostDates(lastPostDates) {
  //// Create "lastPostDates.json" file if one is not found
  try {
    // Check if the file exists
    await fs.access(LAST_POST_DATES_FILE);
  } catch (err) {
    // Create the file if it doesn't exist
    await fs.writeFile(
      LAST_POST_DATES_FILE,
      JSON.stringify({}, null, 2),
      "utf8"
    );

    logger(
      "info",
      `Could not find a "${LAST_POST_DATES_FILE}" file! Omni has created one for you!`
    );
  }

  //// Read the file and parse its content and return it as lastPostDates
  try {
    const data = await fs.readFile(LAST_POST_DATES_FILE, "utf8");
    logger("info", "Last post dates for RSS feeds updated successfully");
    return (lastPostDates = JSON.parse(data)); // needed in checkRSSFeed logic
  } catch (err) {
    logger("error", "Error loading lastPostDates", "", err);
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = loadLastPostDates;
