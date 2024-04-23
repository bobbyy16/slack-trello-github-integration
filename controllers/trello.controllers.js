const Trello = require("trello");
const trello = new Trello(
  process.env.TRELLO_API_KEY,
  process.env.TRELLO_API_TOKEN
);

const createTrelloCard = async (title, description, eventType) => {
  try {
    let list_id;
    switch (eventType) {
      case "push":
        list_id = "E1XBou5M";
        break;
      case "pull_request":
        list_id = "wy9Py8cS";
        break;
      case "issues":
        list_id = "TupV9b6l";
        break;
      default:
        console.log("Unknown event type:", eventType);
        return;
    }

    const card = await trello.addCard(title, description, list_id);
    console.log("Trello card created:", card);
  } catch (error) {
    console.error("Error creating Trello card:", error);
  }
};

module.exports = { createTrelloCard };
