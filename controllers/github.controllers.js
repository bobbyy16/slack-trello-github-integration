const axios = require("axios");
require("dotenv").config();

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

exports.handleGitHubEvent = (req, res) => {
  const event = req.headers["x-github-event"];
  const payload = req.body;

  // Forward the GitHub event payload to Slack
  axios
    .post(SLACK_WEBHOOK_URL, payload)
    .then((response) => {
      console.log(`GitHub event forwarded to Slack: ${event}`);
      res.status(200).send("Event forwarded to Slack");
    })
    .catch((error) => {
      console.error("Error forwarding event to Slack:", error);
      res.status(500).send("Error forwarding event to Slack");
    });
};
