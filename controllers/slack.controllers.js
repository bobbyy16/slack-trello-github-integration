require("dotenv").config();
const { IncomingWebhook } = require("@slack/webhook");

const listId = {
  ISSUES: process.env.ISSUES_SLACK_WEBHOOK_URL,
  PULL_REQUEST: process.env.PULL_REQUEST_SLACK_WEBHOOK_URL,
  PUSH: process.env.PUSH_SLACK_WEBHOOK_URL,
  OTHERS: process.env.OTHERS_SLACK_WEBHOOK_URL,
};

// const postToSlack = async (message, eventType) => {
//   try {
//     const webhookUrl = listId[eventType];
//     if (!webhookUrl) {
//       console.error("No webhook URL found for event type:", eventType);
//       return;
//     }
//     const webhook = new IncomingWebhook(webhookUrl);
//     await webhook.send({
//       text: message,
//     });
//     console.log("Message posted to Slack");
//   } catch (error) {
//     console.error("Error posting to Slack:", error);
//   }
// };

const postToSlack = async (message, eventType, eventData) => {
  try {
    const webhookUrl = listId[eventType];
    if (!webhookUrl) {
      console.error("No webhook URL found for event type:", eventType);
      return;
    }

    let updatedMessage = message;

    if (
      (eventType === "ISSUES" || eventType === "PULL_REQUEST") &&
      eventData.action === "closed"
    ) {
      updatedMessage += ":x: closed";
    }

    const webhook = new IncomingWebhook(webhookUrl);
    await webhook.send({
      text: updatedMessage,
    });
    console.log("Message posted to Slack");
  } catch (error) {
    console.error("Error posting to Slack:", error);
  }
};

module.exports = { postToSlack };
