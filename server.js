const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const axios = require("axios");
/* const apiKey = "jQXf0hnkSSEBMShRd9xAtNzua";
const secretKey = "J5dnOCpKnwJxKhYj9cuZBju6sp0OUJdJcAUh3E0U9XZtKPSEdK";
 */

/* const oauth_consumer_key = "jQXf0hnkSSEBMShRd9xAtNzua";
const oauth_nonce = "TazoBibOrCk";
const oauth_signature = "C6bBvIXBjiO9b53zYzI8Z7UD3g4%3D";
const oauth_signature_method = "HMAC-SHA1";
const oauth_timestamp = "1624669576";
const oauth_version = "1.0";
const oauth_token = "yx6RIgAAAAABQyKWAAABekXbSvo";
const oauth_token_secret =
  "WnlGaWxcuLRUPLALgobNVqjJeNJfJnLy&oauth_callback_confirmed=true"; */

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAAJYiQwEAAAAAPkUegO9fKDR6cN9gw0tfkUfeOyw%3DFx30W9HNYgqpJoKqC1nRGW1CUk5GVMsOSXP2WHuKEH1kRD0dS4";
const authAxios = axios.create({
  baseURL: "https://api.twitter.com/2/",
  headers: {
    Accept: `application/json`,
    Authorization: `Bearer ${bearerToken}`,
  },
});

app.use(express.static(path.join(__dirname, "client/build")));
app.get("/UserSearch", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});
app.get("/RandomTweet", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

app.get("/images/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `client/src/images/${req.params.name}`));
});

//find userId
app.get("/UserSearch/findId/:name", async (req, res) => {
  let idInfo;
  try {
    const response = await authAxios.get(
      `https://api.twitter.com/2/users/by/username/${req.params.name}?user.fields=profile_image_url`
    );
    console.log(response.data.data);
    idInfo = response.data.data.id;
  } catch (error) {
    console.error(error);
  }
  res.send(idInfo);
});

app.get("/UserSearch/findTweets/:id", async (req, res) => {
  const table = [];
  try {
    const response = await authAxios.get(
      `https://api.twitter.com/2/users/${req.params.id}/tweets?expansions=attachments.poll_ids,attachments.media_keys,author_id,entities.mentions.username,referenced_tweets.id&tweet.fields=attachments,author_id,conversation_id,created_at,id,referenced_tweets,source,text,public_metrics&user.fields=created_at,id,name,pinned_tweet_id,profile_image_url,url,username&place.fields=contained_within,full_name,id,name&poll.fields=duration_minutes,end_datetime,id,options,voting_status&media.fields=duration_ms,media_key,preview_image_url,url,public_metrics&max_results=7`
    );
    const allItems = response.data.data;
    const mediaStuff = response.data.includes.media;
    const userStuff = response.data.includes.user;
    table.push(allItems);
  } catch (error) {
    console.error(error);
  }
  res.send(table);
});

//modify and refactor later
/* app.get("/UserSearch/Timeline/:name", async (req, res) => {
  const table = [];
  try {
    const response = await authAxios.get(
      //Searching by name and display timeline
      `statuses/user_timeline.json?screen_name=${req.params.name}&tweet_mode=extended`
      `https://api.twitter.com/2/users/${req.params.id}/tweets?expansions=attachments.poll_ids,attachments.media_keys,author_id,entities.mentions.username,referenced_tweets.id&tweet.fields=attachments,author_id,conversation_id,created_at,id,referenced_tweets,source,text,public_metrics&user.fields=created_at,id,name,pinned_tweet_id,profile_image_url,url,username&place.fields=contained_within,full_name,id,name&poll.fields=duration_minutes,end_datetime,id,options,voting_status&media.fields=duration_ms,media_key,preview_image_url,url,public_metrics&max_results=7`
    );
    const allData = response.data;
    allData.map((item) => {
      const itemInfo = {
        postId: item.id,
        userId: item.user.id,
        userName: item.user.name,
        screenName: item.user.screen_name,
        context: item.text,
        time: item.created_at,
        retweets: item.retweet_count,
        favorite: item.favorite_count,
        profileImage: item.user.profile_image_url,
        contentLink: item.entities.urls,
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
      Searching by name and mixed mentions
      `search/tweets.json?q=${req.params.name}`
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
        contextImg: item.entities.media,
      };
      if (table.length < 10) {
        table.push(itemInfo);
      }
    });
  } catch (error) {
    console.error(error);
  }
  res.send(table);
}); */

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(port, () => console.log(`listening on port ${port}`));
