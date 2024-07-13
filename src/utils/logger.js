"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const color = require("./color.js");
const getCurrentDateTime = require("../helpers/getCurrentDateTime.js");

///////////////////////////////////////////////////////////////////////////////
//////// Structured Custom Logs
function logger(messageType, message, interaction, error) {
  let textColor;
  let formattedMessage;

  // Determine message format/color based on inputs
  switch (messageType) {
    case "info":
      textColor = color.magenta;
      formattedMessage = `${message}`;
      break;
    case "request":
      textColor = color.yellow;
      formattedMessage = `${message}`;
      break;
    case "success":
      textColor = color.green;
      formattedMessage = `${message}`;
      break;
    case "error":
      textColor = color.red;
      formattedMessage = `ERROR: ${message} \`${error.message}\`\n\`${error.stack}\``;
      break;
    case "discordAction":
      textColor = color.cyan;
      formattedMessage = `${message}`;
      break;
    case "commandUsed":
      textColor = color.cyan;
      formattedMessage = `Slash command "${interaction}" triggered by ${interaction.user.username} in ${interaction.channel.name}`;
      break;
    case "commandUseDenied":
      textColor = color.cyan;
      formattedMessage = `Slash command ${interaction} triggered by ${interaction.user.username} in ${interaction.channel.name} - ${color.red}Denied: Unauthorized User!${color.reset}`;
      break;
    default:
      textColor = color.reset;
      formattedMessage = `${message}`;
      break;
  }

  // Add timestamp to the log message
  const dateTime = getCurrentDateTime();

  // Format and log message
  return console.log(
    `${dateTime} | ${textColor}${formattedMessage}${color.reset}`
  );
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = logger;
