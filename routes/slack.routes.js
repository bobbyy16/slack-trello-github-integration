// slackRoutes.js

const express = require("express");
const router = express.Router();
const { postToSlack } = require("../controllers/slack.controllers.js");

// Slack Slash Command Endpoint
router.post("/command", postToSlack);

module.exports = router;
