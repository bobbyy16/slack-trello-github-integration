const { createTrelloCard } = require("./trello.controllers.js");
const { postToSlack } = require("./slack.controllers.js");

const handleGitHubEvent = async (req, res) => {
  const eventType = req.headers["x-github-event"];
  const eventData = req.body;

  try {
    switch (eventType) {
      case "Pushes":
        await createTrelloCard("push", eventData);
        await postToSlack("New push event!");
        break;
      case "Pull requests":
        await createTrelloCard("pull request", eventData);
        await postToSlack("New pull request!");
        break;
      case "Issues":
        await createTrelloCard("issues", eventData);
        await postToSlack("New issue!");
        break; // Make sure to include break statement here
      default:
        console.log("Unhandled GitHub event type:", eventType);
    }

    res.sendStatus(200).json({ eventData });
  } catch (error) {
    console.error("Error handling GitHub event:", error);
    res.sendStatus(500);
  }
};

module.exports = { handleGitHubEvent };
