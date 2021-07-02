const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const axios = require("axios");
require("dotenv").config();

const bearerToken = process.env.BEARER_TOKEN;
const authAxios = axios.create({
  baseURL: "https://api.twitter.com/2",
  headers: {
    Accept: `application/json`,
    Authorization: `Bearer ${bearerToken}`,
  },
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/search", (req, res) =>
  res.sendFile(path.join(__dirname, "client/build/index.html"))
);

app.get("/favorites", (req, res) =>
  res.sendFile(path.join(__dirname, "client/build/index.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "client/build/index.html"))
);

app.get("/images/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `client/src/images/${req.params.name}`));
});

app.get("/user/search/:field/:name", async (req, res) => {
  let listOfPost;
  const searchType = req.params.field;

  try {
    const findPersonId = await authAxios.get(
      `/users/by/username/${req.params.name}?user.fields=profile_image_url`
    );
    if (searchType === "tweets") {
      const tweetInfo = await getTimeline(findPersonId.data.data);
      listOfPost = tweetInfo;
    } else {
      const tweetInfo = await getMentions(findPersonId.data.data);
      listOfPost = tweetInfo;
    }
  } catch (error) {
    console.error(error);
  }
  res.send(listOfPost);
});

async function getTimeline(userInfo) {
  let listOfTweets = [];
  try {
    const response = await authAxios.get(
      `/users/${userInfo.id}/tweets?expansions=attachments.poll_ids,attachments.media_keys,author_id,entities.mentions.username,referenced_tweets.id&tweet.fields=attachments,author_id,conversation_id,created_at,id,referenced_tweets,source,text,public_metrics&user.fields=created_at,id,name,pinned_tweet_id,profile_image_url,url,username&place.fields=contained_within,full_name,id,name&poll.fields=duration_minutes,end_datetime,id,options,voting_status&media.fields=duration_ms,media_key,preview_image_url,url,public_metrics&max_results=10`
    );
    listOfTweets = sortUserTimeline(response, userInfo);
  } catch (error) {
    console.error(error);
  }
  return listOfTweets;
}

async function getMentions(userInfo) {
  let listOfMentions = [];
  try {
    const response = await authAxios.get(
      `/users/${userInfo.id}/mentions?expansions=author_id,attachments.media_keys&media.fields=url,preview_image_url&tweet.fields=conversation_id,created_at,public_metrics&user.fields=created_at,profile_image_url&max_results=10`
    );
    listOfMentions = sortMultipleUsersInfo(response);
  } catch (error) {
    console.error(error);
  }
  return listOfMentions;
}

app.get("/content/search/:name", async (req, res) => {
  let listOfContent = [];
  try {
    const response = await authAxios.get(
      `/tweets/search/recent?query=${req.params.name}&max_results=10&expansions=author_id,attachments.media_keys&tweet.fields=public_metrics,created_at,lang,conversation_id&user.fields=created_at,entities,profile_image_url&media.fields=media_key,preview_image_url,url`
    );
    listOfContent = sortMultipleUsersInfo(response);
  } catch (error) {
    console.error(error);
  }

  res.send(listOfContent);
});

function sortUserTimeline(response, userInfo) {
  const twitterDataList = response.data.data;
  const twitterMediaList = response.data.includes.media;

  let userCardList = twitterDataList.map((item) => {
    const timeCreated = new Date(item.created_at);
    const convertedDate = timeCreated.toDateString();
    let imageList = [];

    if (item.attachments) {
      const mediaKeyList = item.attachments.media_keys;
      imageList = findMediaUrl(twitterMediaList, mediaKeyList);
    }
    console.log(userInfo.profile_image_url);
    const postInfo = {
      postId: item.id,
      userName: userInfo.username,
      screenName: userInfo.name,
      text: item.text,
      time: convertedDate,
      retweet: item.public_metrics.retweet_count,
      like: item.public_metrics.like_count,
      profileImage: userInfo.profile_image_url,
      images: imageList,
    };
    return postInfo;
  });
  return userCardList;
}

function sortMultipleUsersInfo(response) {
  const twitterDataList = response.data.data;
  const twitterMediaList = response.data.includes.media;
  const twitterUserList = response.data.includes.users;

  let usersCardList = twitterDataList.map((item) => {
    const timeCreated = new Date(item.created_at);
    const convertedDate = timeCreated.toDateString();
    const userInfo = twitterUserList.filter(
      (user) => user.id === item.author_id
    );
    let imageList = [];

    if (item.attachments) {
      const numberOfKeys = item.attachments.media_keys;
      imageList = findMediaUrl(twitterMediaList, numberOfKeys);
    }

    const postInfo = {
      postId: item.id,
      userId: item.author_id,
      userName: userInfo[0].username,
      screenName: userInfo[0].name,
      text: item.text,
      time: convertedDate,
      retweet: item.public_metrics.retweet_count,
      like: item.public_metrics.like_count,
      profileImage: userInfo[0].profile_image_url,
      images: imageList,
    };
    return postInfo;
  });
  return usersCardList;
}

function findMediaUrl(twitterMediaList, mediaKeyList) {
  const findImages = [];
  mediaKeyList.map((key) => {
    twitterMediaList.filter((dataItem) => {
      if (key === dataItem.media_key) {
        findImages.push({
          mediaKey: dataItem.media_key,
          imageUrl: dataItem.url || dataItem.preview_image_url,
        });
      }
    });
  });
  return findImages;
}

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(port, () => console.log(`listening on port ${port}`));
