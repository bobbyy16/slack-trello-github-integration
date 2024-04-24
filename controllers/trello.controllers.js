const Trello = require("trello");
const trello = new Trello(
  process.env.TRELLO_API_KEY,
  process.env.TRELLO_API_TOKEN
);

const listIds = {
  ISSUES: process.env.ISSUES_CARD,
  PULL_REQUEST: process.env.PULL_REQUEST_CARD,
  PUSH: process.env.PUSH_CARD,
  OTHERS: process.env.OTHERS_CARD,
};

const createTrelloCard = async (title, description, eventType) => {
  try {
    let listId;

    switch (eventType) {
      case "ISSUES":
        listId = listIds.ISSUES;
        break;
      case "PULL_REQUEST":
        listId = listIds.PULL_REQUEST;
        break;
      case "PUSH":
        listId = listIds.PUSH;
        break;

      default:
        listId = listIds.OTHERS;
    }

    const card = await trello.addCard(title, description, listId);
    console.log("Trello card created:", card);
  } catch (error) {
    console.error("Error creating Trello card:", error);
  }
};

module.exports = { createTrelloCard };
