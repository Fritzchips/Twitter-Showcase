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

const sortMultipleUserService = require("../controllers/sort-multiple-user-info");

router.get("/:name", async (req, res) => {
  let listOfContent = [];
  try {
    const response = await authAxios.get(
      `/tweets/search/recent?query=${req.params.name}&max_results=10&expansions=author_id,attachments.media_keys&tweet.fields=public_metrics,created_at,lang,conversation_id&user.fields=created_at,entities,profile_image_url&media.fields=media_key,preview_image_url,url`
    );
    listOfContent = sortMultipleUserService.sortMultipleUsersInfo(response);
  } catch (error) {
    console.error(error);
  }

  res.send(listOfContent);
});

module.exports = router;
