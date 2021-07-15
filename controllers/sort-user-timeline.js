const findMediaService = require("./find-media-url");

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

module.exports = {
  sortUserTimeline,
};
