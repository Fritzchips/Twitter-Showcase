const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const axios = require("axios");
const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAAJYiQwEAAAAAPkUegO9fKDR6cN9gw0tfkUfeOyw%3DFx30W9HNYgqpJoKqC1nRGW1CUk5GVMsOSXP2WHuKEH1kRD0dS4";
const authAxios = axios.create({
  baseURL: "https://api.twitter.com/1.1/",
  headers: {
    Accept: `application/json`,
    Authorization: `Bearer ${bearerToken}`,
  },
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

//modify and refactor later
app.get("/UserSearch/Timeline/:name", async (req, res) => {
  const table = [];
  try {
    const response = await authAxios.get(
      //Searching by name and display timeline
      `statuses/user_timeline.json?screen_name=${req.params.name}`
    );
    const allData = response.data;
    allData.map((item) => {
      const itemInfo = {
        postId: item.id,
        userName: item.user.name,
        screenName: item.user.screen_name,
        context: item.text,
        time: item.created_at,
        retweets: item.retweet_count,
        favorite: item.favorite_count,
        profileImage: item.user.profile_image_url,
      };
      if (table.length < 10) {
        table.push(itemInfo);
      }
    });
  } catch (error) {
    console.error(error);
  }

  res.send(table);
});

app.get("/UserSearch/Mentions/:name", async (req, res) => {
  const table = [];
  try {
    const response = await authAxios.get(
      //Searching by name and mixed mentions
      `search/tweets.json?q=${req.params.name}&result_type=mixed`
    );
    const allData = response.data.statuses;
    allData.map((item) => {
      const itemInfo = {
        postId: item.id,
        userName: item.user.name,
        screenName: item.user.screen_name,
        context: item.text,
        time: item.created_at,
        retweets: item.retweet_count,
        favorite: item.favorite_count,
        profileImage: item.user.profile_image_url,
      };
      if (table.length < 10) {
        table.push(itemInfo);
      }
    });
  } catch (error) {
    console.error(error);
  }
  res.send(table);
});

app.listen(port, () => console.log(`listening on port ${port}`));
