// trelloController.js

const Trello = require("trello");
const trello = new Trello(
  process.env.TRELLO_API_KEY,
  process.env.TRELLO_API_TOKEN
);

// Function to create Trello card
const createTrelloCard = async (title, description) => {
  try {
    const card = await trello.addCard(title, description, "list_id");
    console.log("Trello card created:", card);
  } catch (error) {
    console.error("Error creating Trello card:", error);
  }
};

module.exports = { createTrelloCard };
