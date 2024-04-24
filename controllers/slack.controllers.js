require("dotenv").config();
const { IncomingWebhook } = require("@slack/webhook");

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(webhookUrl);

const postToSlack = async (message) => {
  try {
    await webhook.send({
      text: message,
    });
    console.log("Message posted to Slack");
  } catch (error) {
    console.error("Error posting to Slack:", error);
  }
};

module.exports = { postToSlack };
