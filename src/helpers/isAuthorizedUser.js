"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const logger = require("../utils/logger.js");
const ephmeralResponse = require("./ephemeralResponse.js");

const config = require("../config.js");

///////////////////////////////////////////////////////////////////////////////
//////// Confirm if a user is an admin or owner (authorization)
async function isAuthorizedUser(interaction, authLevel) {
  switch (authLevel) {
    //// Owner authorization check
    case "owner": {
      if (interaction.user.id !== config.OWNER_ID) {
        logger("commandUseDenied", "", interaction, "");

        // Inform the user
        await ephmeralResponse(
          interaction,
          `You are not allowed to use this command`,
          "",
          ""
        );

        return false; // user is NOT allowed to use this command
      }

      return true; // user is allowed to use this command
    }

    //// Admin authorization check
    case "admin": {
      // Check if the user is indeed an administrator
      if (!config.ADMIN_IDS.includes(interaction.user.id)) {
        logger("commandUseDenied", "", interaction, "");

        // Inform the user
        await ephmeralResponse(
          interaction,
          `You are not allowed to use this command`,
          "",
          ""
        );

        return false; // user is NOT allowed to use this command
      }

      return true; // user is allowed to use this command
    }
  }
}

module.exports = isAuthorizedUser;
