// github.controllers.js

const { postToSlack } = require("./slack.controllers.js");

const handleGitHubEvent = async (req, res) => {
  const eventType = req.headers["x-github-event"];
  const eventData = req.body;

  try {
    switch (eventType) {
      case "push":
        await handlePushEvent(eventData);
        await postToSlack("Push event occurred on the repository.");
        break;
      case "pull_request":
        await handlePullRequestEvent(eventData);
        await postToSlack("Pull request event occurred on the repository.");
        break;
      case "issues":
        await handleIssuesEvent(eventData);
        await postToSlack("Issues event occurred on the repository.");
        break;
      default:
        console.log("Unhandled GitHub event type:", eventType);
    }

    res.sendStatus(200);
    console.log(eventData);
  } catch (error) {
    console.error("Error handling GitHub event:", error);
    res.sendStatus(500);
  }
};

module.exports = { handleGitHubEvent };
