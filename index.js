const express = require("express");
const githubRoutes = require("./routes/github.routes.js");
const trelloRoutes = require("./routes/trello.routes.js");
const slackRoutes = require("./routes/slack.routes.js");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey boooi");
});

app.use("/github", githubRoutes);
app.use("/trello", trelloRoutes);
app.use("/slack", slackRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is listening at port http://localhost:${PORT}`);
});
