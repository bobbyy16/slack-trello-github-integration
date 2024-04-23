const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hey boooi");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is listening at port http://localhost:${PORT}`);
});
