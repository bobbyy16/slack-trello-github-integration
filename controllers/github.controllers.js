const { createTrelloCard } = require("./trello.controllers.js");

const handleGitHubEvent = async (req, res) => {
  const eventType = req.headers["x-github-event"];
  const eventData = req.body;

  try {
    switch (eventType) {
      case "push":
        await createTrelloCard("push", eventData); // Adjust the card title and description as needed
        break;
      case "pull_request":
        await createTrelloCard("pull request", eventData); // Adjust the card title and description as needed
        break;
      case "issues":
        await createTrelloCard("issues", eventData); // Adjust the card title and description as needed
        break;
      default:
        console.log("Unhandled GitHub event type:", eventType);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling GitHub event:", error);
    res.sendStatus(500);
  }
};

module.exports = { handleGitHubEvent };
