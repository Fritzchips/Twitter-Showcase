const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const userSearchRoute = require("./routes/user-search");
const contentSearchRoute = require("./routes/content-search");

app.use(express.static(path.join(__dirname, "client/build")));

app.get(["/", "/search", "/favorites"], (req, res) =>
  res.sendFile(path.join(__dirname, "client/build/index.html"))
);

app.get("/images/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `client/src/images/${req.params.name}`));
});

app.use("/user/search/", userSearchRoute);

app.use("/content/search", contentSearchRoute);

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
