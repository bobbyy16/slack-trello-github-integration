// githubEventHandler.js
const { postToSlack } = require("./slack.controllers.js");
const { createTrelloCard } = require("./trello.controllers.js");

const handleGitHubEvent = async (req, res) => {
  try {
    // Extract GitHub event type
    const eventType = req.headers["x-github-event"].toUpperCase(); // Convert to uppercase for consistency

    console.log("Received GitHub event type:", eventType);

    // Store webhook data
    const webhooks = {
      COMMIT: [],
      PUSH: [],
      MERGE: [],
      ISSUES: [],
      PULL_REQUESTS: [], // Match the case with the received event type
    };

    // Check if eventType is valid
    if (!(eventType in webhooks)) {
      throw new Error(`Invalid GitHub event type: ${eventType}`);
    }

    // Extract payload data
    const { payloadUrl, secret } = req.body;

    // Store webhook data based on event type
    webhooks[eventType].push({ payloadUrl, secret });

    // Send notification to Slack
    await postToSlack(`Received GitHub event: ${eventType}`);

    // Create Trello card based on event type
    await createTrelloCard(
      eventType,
      `New ${eventType} event received`,
      eventType
    );

    // Set response headers
    res.setHeader("x-github-event", eventType);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error handling GitHub event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleGitHubEvent };
