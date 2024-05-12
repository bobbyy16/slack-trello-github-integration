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
    let eventTitle = ``;
    let eventDescription = ` `;

    switch (eventType) {
      case "ISSUES":
        eventTitle += `Issue Number: ${eventData.issue.number} - ${eventData.issue.title}`;
        eventDescription += `Issue URL: ${eventData.issue.html_url}\n`;
        await createTrelloCard(eventTitle, eventDescription, eventType);
        await postToSlack(
          eventTitle + "\n" + eventDescription,
          eventType,
          eventData
        );
        break;
      case "PULL_REQUEST":
        eventTitle += `Pull Request Number: ${eventData.pull_request.number} - ${eventData.pull_request.title}`;
        eventDescription += `Pull Request URL: ${eventData.pull_request.html_url}\n`;

        const linkedIssues = eventData.pull_request.body.match(/#(\d+)/g);
        if (linkedIssues && linkedIssues.length > 0) {
          eventDescription += "Linked Issues:";
          for (const linkedIssue of linkedIssues) {
            const issueNumber = linkedIssue.substring(1);
            const issueUrl = `${eventData.repository.html_url}/issues/${issueNumber}`;
            eventDescription += `  - Issue Number: ${issueNumber}, URL: ${issueUrl}\n`;
          }
        }

        const assignees = eventData.pull_request.assignees;
        if (assignees && assignees.length > 0) {
          eventDescription += "Assignees:";
          for (const assignee of assignees) {
            eventDescription += `  - ${assignee.login}\n`;
          }
        }

        await createTrelloCard(eventTitle, eventDescription, eventType);
        await postToSlack(
          eventTitle + "\n" + eventDescription,
          eventType,
          eventData
        );
        break;

      case "PUSH":
        eventTitle += `Recent push`;
        eventDescription += `Pusher Username: ${eventData.pusher.name}\n`;
        eventDescription += `Commits Count: ${eventData.commits.length}\n`;
        eventDescription += `Compare URL: ${eventData.compare}\n`;
        await createTrelloCard(eventTitle, eventDescription, eventType);
        await postToSlack(
          eventTitle + "\n" + eventDescription,
          eventType,
          eventData
        );
        break;
      default:
        console.log("Unknown event type:", eventType);
        break;
    }

    res.setHeader("x-github-event", eventType);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error handling GitHub event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleGitHubEvent };
