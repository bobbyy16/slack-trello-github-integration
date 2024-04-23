const express = require("express");
const router = express.Router();
const { handleGitHubEvent } = require("../controllers/github.controllers.js");

// GitHub Webhook Endpoint
router.post("/webhook", handleGitHubEvent);

module.exports = router;
