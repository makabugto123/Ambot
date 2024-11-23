const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
name: 'shotiv2',
usage: 'shotiv2',
description: 'Generate a random TikTok video.',
author: 'Jerome',
async execute(senderId, args, pageAccessToken, sendMessage) {
try {
const apiUrl = 'https://kaiz-apis.gleeze.com/api/shoti';
const response = await axios.get(apiUrl);
const videoUrl = response.data.videoUrl;
const title = response.data.title;
const username = response.data.username;
const nickname = response.data.nickname;
const auth = response.data.author;
const duration = response.data.duration;
const region = response.data.region;
//const tiktokUrl = response.data.tiktokUrl;

  const message = `Title: ${title}\n\nAuthor: ${auth}\n\nUsername: ${username}\n\nNickname: ${nickname}\n\nDuration: ${duration}\n\nRegion: ${region}\n\n𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖎𝖓𝖌...`;
  await sendMessage(senderId, { text: message }, pageAccessToken);

  const videoMessage = {
    attachment: {
      type: 'video',
      payload: {
        url: videoUrl,
      },
    },
  };
  await sendMessage(senderId, videoMessage, pageAccessToken);
} catch (error) {
  console.error('Error:', error.message);
  sendMessage(senderId, {
    text: 'Sorry, there was an error generating the video. Please try again later.',
  }, pageAccessToken);
}

},
};
