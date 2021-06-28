const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const axios = require("axios");
/* const apiKey = "jQXf0hnkSSEBMShRd9xAtNzua";
const secretKey = "J5dnOCpKnwJxKhYj9cuZBju6sp0OUJdJcAUh3E0U9XZtKPSEdK";
 */

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAAJYiQwEAAAAAPkUegO9fKDR6cN9gw0tfkUfeOyw%3DFx30W9HNYgqpJoKqC1nRGW1CUk5GVMsOSXP2WHuKEH1kRD0dS4";
const authAxios = axios.create({
  baseURL: "https://api.twitter.com/2",
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
app.get("/UserSearch/:field/:name", async (req, res) => {
  let idInfo;
  let fieldSearching = req.params.field;

  try {
    const response = await authAxios.get(
      `/users/by/username/${req.params.name}?user.fields=profile_image_url`
    );
    if (fieldSearching === "tweets") {
      const tweetInfo = await getInformation(response.data.data);

      idInfo = tweetInfo;
    } else {
      const tweetInfo = await getMentions(response.data.data);
      idInfo = tweetInfo;
    }
  } catch (error) {
    console.error(error);
  }
  /* console.log(idInfo); */
  res.send(idInfo);
});

async function getInformation(userInfo) {
  const table = [];
  try {
    const response = await authAxios.get(
      //Tweets or mentions
      `/users/${userInfo.id}/tweets?expansions=attachments.poll_ids,attachments.media_keys,author_id,entities.mentions.username,referenced_tweets.id&tweet.fields=attachments,author_id,conversation_id,created_at,id,referenced_tweets,source,text,public_metrics&user.fields=created_at,id,name,pinned_tweet_id,profile_image_url,url,username&place.fields=contained_within,full_name,id,name&poll.fields=duration_minutes,end_datetime,id,options,voting_status&media.fields=duration_ms,media_key,preview_image_url,url,public_metrics&max_results=7`
    );
    const allItems = response.data.data;

    const mediaStuff = response.data.includes.media;
    allItems.map((item) => {
      console.log(item);

      let listImage = [];

      if (item.attachments) {
        const numberOfKeys = item.attachments.media_keys;
        numberOfKeys.map((key) => {
          mediaStuff.filter((dataItem) => {
            if (key == dataItem.media_key) {
              listImage.push({
                mediaKey: dataItem.media_key,
                url: dataItem.url || dataItem.preview_image_url,
              });
            }
          });
        });
      } else {
        console.log("nothing");
      }

      const itemInfo = {
        postId: item.id,
        userName: userInfo.username,
        screenName: userInfo.name,
        text: item.text,
        time: item.created_at,
        retweet: item.public_metrics.retweet_count,
        like: item.public_metrics.like_count,
        profileImage: userInfo.profile_image_url,
        contentLink: listImage,
      };
      table.push(itemInfo);
    });
  } catch (error) {
    console.error(error);
  }
  return table;
}

async function getMentions(userInfo) {
  const table = [];
  try {
    const response = await authAxios.get(
      `/users/${userInfo.id}/mentions?expansions=author_id,attachments.media_keys&media.fields=url,preview_image_url&tweet.fields=conversation_id,created_at&user.fields=created_at,profile_image_url&max_results=7`
    );
    const allItems = response.data.data;

    const mediaStuff = response.data.includes.media;
    const mediaUser = response.data.includes.users;

    console.log("mediaStuff", mediaStuff);
    allItems.map((item) => {
      let listImage = [];
      if (item.attachments) {
        item.attachments.media_keys.map((key) => {
          mediaStuff.filter((dataItem) => {
            if (key === dataItem.media_key) {
              console.log("mediaInfo:", mediaStuff);
              listImage.push({
                mediaKey: dataItem.media_key,
                url: dataItem.url || dataItem.preview_image_url,
              });
            }
          });
        });
      }
      let userInfo = mediaUser.filter((user) => user.id === item.author_id);

      console.log("userInfo", userInfo[0]);

      const itemInfo = {
        postId: item.id,
        userId: item.author_id,
        userName: userInfo[0].username,
        screenName: userInfo[0].name,
        text: item.text,
        time: item.created_at,
        /* retweet: item.public_metrics.retweet_count,
        like: item.public_metrics.like_count, */
        profileImage: userInfo[0].profile_image_url,
        contentLink: listImage,
      };
      table.push(itemInfo);
    });
  } catch (error) {
    console.error(error);
  }

  return table;
}

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(port, () => console.log(`listening on port ${port}`));
