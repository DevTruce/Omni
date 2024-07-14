///////////////////////////////////////////////////////////////////////////////
//////// Imports & Variables
const { EmbedBuilder } = require("discord.js");
const RSSParser = require("rss-parser");
const parser = new RSSParser();

const logger = require("./logger.js");
const loadLastPostDates = require("../helpers/loadLastPostDates.js");
const saveLastPostDates = require("../helpers/saveLastPostDates.js");

const config = require("../config.js");

let lastPostDates = {}; // Object to store last post dates for each RSS URL
const errorMessage = "Error processing RSS feeds";

///////////////////////////////////////////////////////////////////////////////
//////// Loop rss feed obj and relay the lastest post for each RSS URL
async function checkRSSFeeds(client) {
  try {
    // Get the persisted lastPostDates data
    lastPostDates = await loadLastPostDates(lastPostDates);

    // Loop through each object inside of the RSS Feeds array
    for (const feed of config.RSS_FEEDS) {
      // Get the url and matching channel of the current feed
      const RSS_URL = feed.RSS_URL;
      const CHANNEL_ID = feed.CHANNEL_ID;

      try {
        // Parse RSS Feed and check if there is any data
        const feedData = await parser.parseURL(RSS_URL);
        if (!feedData || feedData.items.length === 0) {
          logger(`No feed data or items for RSS Feed: ${RSS_URL}`);
          continue;
        }

        // Get the latest post from the feed
        const latestPost = feedData.items[0];
        const postDate = new Date(latestPost.isoDate);

        // Initialize last post date if not already set for this RSS URL
        if (!lastPostDates[RSS_URL]) {
          lastPostDates[RSS_URL] = null;
        }

        // Check if this post is newer than the last processed post for this RSS URL
        if (!lastPostDates[RSS_URL] || postDate > lastPostDates[RSS_URL]) {
          // Update the last post date for this RSS URL to current post's date
          lastPostDates[RSS_URL] = postDate;

          // Fetch the Discord channel where the message will be sent
          const channel = await client.channels.fetch(CHANNEL_ID);

          // Cut the content snippet to fit within Discord's limits (max 4096 characters)
          let contentSnippet = latestPost.contentSnippet.slice(0, 4096);

          // Create an embed message with the post details
          const embed = new EmbedBuilder()
            .setTitle(latestPost.title)
            .setURL(latestPost.link)
            .setDescription(contentSnippet) // Use the cut content snippet
            .setTimestamp(postDate);

          // Send the embed message into the discord channel
          await channel.send({ embeds: [embed] });
        }
      } catch (err) {
        logger("error", `${errorMessage} ${RSS_URL}`, "", err);
      }
    }

    // Save last post dates to file after processing to be persisted
    await saveLastPostDates(lastPostDates);
  } catch (err) {
    logger("error", errorMessage, "", err);
  }
}

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = checkRSSFeeds;
