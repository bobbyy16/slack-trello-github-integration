const Trello = require("trello");
const trello = new Trello(
  process.env.TRELLO_API_KEY,
  process.env.TRELLO_API_TOKEN
);

// Update list IDs according to your Trello board
const listIds = {
  PUSH: "66288f3d82cac29141b8eb6c",
  PULL_REQUESTs: "66288f3d82cac29141b8eb6b",
  ISSUES: "66288f3d82cac29141b8eb6a",
  MERGE: "66289bb5c4ea40e9de6125ac",
};

const createTrelloCard = async (title, description, eventType) => {
  try {
    // Get the list ID based on the event type
    const listId = listIds[eventType];

    // If the eventType is not recognized, log an error and return
    if (!listId) {
      console.log("Unknown event type:", eventType);
      return;
    }

    // Add the card to the corresponding list
    const card = await trello.addCard(title, description, listId);
    console.log("Trello card created:", card);
  } catch (error) {
    console.error("Error creating Trello card:", error);
  }
};

module.exports = { createTrelloCard };
