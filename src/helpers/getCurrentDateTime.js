"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const color = require("../utils/color.js");

///////////////////////////////////////////////////////////////////////////////
//////// Get a timestamp of the current date and time
function getCurrentDateTime() {
  const now = new Date();

  // Formatting options
  const options = { month: "long", day: "numeric" };
  const date = now.toLocaleDateString("en-US", options);

  // Get current hours:minutes and am/pm
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from military time to standard time
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Format time string
  const time = `${hours}:${minutes}:${ampm}`;

  // Return formatted date and time string [timestamp] || [July 28, 6:00:PM]
  return `${color.white}[${date}, ${time}]${color.reset}`;
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = getCurrentDateTime;
