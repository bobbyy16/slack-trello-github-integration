require("dotenv").config();
const { IncomingWebhook } = require("@slack/webhook");
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

// Function to post message to Slack channel
const postToSlack = async (message) => {
  try {
    console.log("SLACK_WEBHOOK_URL:", process.env.SLACK_WEBHOOK_URL); // Add this line for debugging
    await webhook.send({
      text: message,
    });
    console.log("Message posted to Slack");
  } catch (error) {
    console.error("Error posting to Slack:", error);
  }
};

module.exports = postToSlack;
