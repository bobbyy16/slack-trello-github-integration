const express = require("express");
const router = express.Router();
const { createTrelloCard } = require("../controllers/trello.controllers.js");

// Trello Webhook Endpoint
router.post("/webhook", createTrelloCard);

module.exports = router;
