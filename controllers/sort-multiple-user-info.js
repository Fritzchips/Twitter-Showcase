const findMediaService = require("./find-media-url");

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
      imageList = findMediaService.findMediaUrl(twitterMediaList, numberOfKeys);
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

module.exports = {
  sortMultipleUsersInfo,
};
