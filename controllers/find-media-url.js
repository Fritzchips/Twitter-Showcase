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

module.exports = {
  findMediaUrl,
};
