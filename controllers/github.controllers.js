const { postToSlack } = require("./slack.controllers.js");
const { createTrelloCard } = require("./trello.controllers.js");

const handleGitHubEvent = async (req, res) => {
  try {
    const eventType = req.headers["x-github-event"].toUpperCase();
    console.log("Received GitHub event type:", eventType);

    // Check if eventType should be ignored
    if (
      [
        "STATUS",
        "CHECK_RUN",
        "CHECK_SUITE",
        "DEPLOYMENT",
        "DEPLOYMENT_STATUS",
        "ISSUE_COMMENT",
      ].includes(eventType)
    ) {
      console.log("Ignoring event type:", eventType);
      res.setHeader("x-github-event", eventType);
      return res.status(200).json({ success: true });
    }

    const eventData = req.body;

    let eventTitle = `New GitHub ${eventType} event`;

    let eventDescription = `Event Type: ${eventType}\n\n`;

    switch (eventType) {
      case "ISSUES":
        eventDescription += `Issue Number: ${eventData.issue.number}\n`;
        eventDescription += `Issue Title: ${eventData.issue.title}\n`;
        eventDescription += `Issue URL: ${eventData.issue.html_url}\n`;
        await createTrelloCard(eventTitle, eventDescription, eventType);
        break;
      case "PULL_REQUEST":
        eventDescription += `Pull Request Number: ${eventData.pull_request.number}\n`;
        eventDescription += `Pull Request Title: ${eventData.pull_request.title}\n`;
        eventDescription += `Pull Request URL: ${eventData.pull_request.html_url}\n`;
        await createTrelloCard(eventTitle, eventDescription, eventType);
        break;
      case "PUSH":
        eventDescription += `Pusher Username: ${eventData.pusher.name}\n`;
        eventDescription += `Commits Count: ${eventData.commits.length}\n`;
        eventDescription += `Compare URL: ${eventData.compare}\n`;
        await createTrelloCard(eventTitle, eventDescription, eventType);
        break;
      default:
        console.log("Unknown event type:", eventType);
    }

    await postToSlack(eventTitle + "\n" + eventDescription);

    res.setHeader("x-github-event", eventType);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error handling GitHub event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleGitHubEvent };
