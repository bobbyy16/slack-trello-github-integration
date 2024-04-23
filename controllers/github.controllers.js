// Function to handle GitHub webhook events
const handleGitHubEvent = (req, res) => {
  const eventType = req.headers["x-github-event"];
  const eventData = req.body;

  // Process GitHub event
  try {
    switch (eventType) {
      case "push":
        handlePushEvent(eventData);
        break;
      case "pull_request":
        handlePullRequestEvent(eventData);
        break;
      case "issues":
        handleIssuesEvent(eventData);
        break;
      // Add more cases for other GitHub events
      default:
        console.log("Unhandled GitHub event type:", eventType);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("error", error.message);
  }
};

// Function to handle push event
const handlePushEvent = (eventData) => {
  const { repository, ref, commits } = eventData;
  const branch = ref.split("/").slice(-1)[0];

  console.log(
    `Push event received for repository ${repository.full_name} on branch ${branch}`
  );
  console.log("Commits:", commits);
};

// Function to handle pull request event
const handlePullRequestEvent = (eventData) => {
  const { action, pull_request, repository } = eventData;

  console.log(`Pull request ${action} on repository ${repository.full_name}`);
  console.log("Pull request details:", pull_request);
};

// Function to handle issues event
const handleIssuesEvent = (eventData) => {
  const { action, issue, repository } = eventData;

  console.log(`Issue ${action} on repository ${repository.full_name}`);
  console.log("Issue details:", issue);
};

module.exports = { handleGitHubEvent };
