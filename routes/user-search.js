const express = require("express");
const router = express.Router();
const axios = require("axios");
const bearerToken = process.env.BEARER_TOKEN;
const authAxios = axios.create({
  baseURL: "https://api.twitter.com/2",
  headers: {
    Accept: `application/json`,
    Authorization: `Bearer ${bearerToken}`,
  },
});

const findMediaService = require("../controllers/find-media-url");
const sortMultipleUserService = require("../controllers/sort-multiple-user-info");

router.get("/:field/:name", async (req, res) => {
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
    listOfMentions = sortMultipleUserService.sortMultipleUsersInfo(response);
  } catch (error) {
    console.error(error);
  }
  return listOfMentions;
}

function sortUserTimeline(response, userInfo) {
  const twitterDataList = response.data.data;
  const twitterMediaList = response.data.includes.media;

  let userCardList = twitterDataList.map((item) => {
    const timeCreated = new Date(item.created_at);
    const convertedDate = timeCreated.toDateString();
    let imageList = [];

    if (item.attachments) {
      const mediaKeyList = item.attachments.media_keys;
      imageList = findMediaService.findMediaUrl(twitterMediaList, mediaKeyList);
    }

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

module.exports = router;
