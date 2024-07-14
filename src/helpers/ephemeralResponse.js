"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const config = require("../config");

///////////////////////////////////////////////////////////////////////////////
//////// Response that only the user can see + auto deletion in set seconds
async function ephmeralResponse(interaction, response) {
  interaction
    .reply({
      content: response, // message to display
      ephemeral: true, // display to calling user only!
    })
    .then(msg => {
      setTimeout(() => msg.delete(), config.TIMEOUT_INTERVAL);
    }); // automatically delete message after set timeout
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = ephmeralResponse;
