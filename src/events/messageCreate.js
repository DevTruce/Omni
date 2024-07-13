"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Imports/Variables
const config = require("../config");

///////////////////////////////////////////////////////////////////////////////
//////// Event Listener for Message Creation
module.exports = {
  name: "messageCreate",
  once: false,

  async execute(message) {
    if (message.author.bot) return; // ignore bot messages

    if (message.content) {
      console.log("test working, message received");
    }
  },
};
