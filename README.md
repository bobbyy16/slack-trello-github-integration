# GitHub-Trello-Slack Integration

This project enables seamless integration between GitHub, Trello, and Slack, facilitating efficient project management and collaboration workflows.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Overview

GitHub, Trello, and Slack are popular tools used by development teams for version control, project management, and communication. This integration allows you to automate tasks, streamline processes, and keep your team informed about important GitHub events directly through Trello boards and Slack channels.

## Features

- **GitHub Event Handling**: Receive various GitHub events such as issues, pull requests, and pushes.
- **Trello Card Creation**: Automatically create Trello cards for different types of GitHub events and categorize them into appropriate lists.
- **Slack Notifications**: Send notifications to specified Slack channels about the processed GitHub events.

## Setup

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.

2. **Install Dependencies**: Run `npm install` to install all the required dependencies.

3. **Environment Variables**: Set up the required environment variables for Trello and Slack API access. Create a `.env` file in the root directory and add the following variables:

   ```dotenv
   # Trello API keys
   TRELLO_API_KEY=<your_trello_api_key>
   TRELLO_API_TOKEN=<your_trello_api_token>

   # Trello List IDs
   ISSUES_CARD=<issues_list_id>
   PULL_REQUEST_CARD=<pull_request_list_id>
   PUSH_CARD=<push_list_id>
   OTHERS_CARD=<others_list_id>

   # Slack Webhook URL
   SLACK_WEBHOOK_URL=<your_slack_webhook_url>
   ```

## Usage

1. **Start the Server**: Run `npm start` to start the server.
2. **Configure GitHub Webhooks**: Set up GitHub webhooks to send events to the endpoint exposed by the server.
3. **Monitor Logs**: Keep an eye on the console logs for any errors or unexpected behavior during event processing.

## Technologies

- Node.js
- Express.js
- Trello API
- Slack Webhooks

## Functionality

### GitHub Event Handling

- Listens for various GitHub events including issues, pull requests, and pushes.
- Processes each event and creates corresponding Trello cards.
- Ignores certain event types like status checks and deployments.

### Trello Integration

- Utilizes the Trello API to create cards on specific Trello boards.
- Differentiates between issues, pull requests, and other events to assign cards to appropriate lists.

### Slack Notifications

- Sends event notifications to Slack using webhooks.
- Includes event details such as event type, issue/pull request details, and relevant URLs.

## Notes

- Ensure that environment variables are properly configured, including Trello API key, token, and list IDs.
- Regularly monitor server logs for any issues or errors.
- Customize event handling and notifications based on specific project requirements.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests to improve the project.
