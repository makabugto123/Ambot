const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
name: 'shoti',
usage: 'shoti',
description: 'Generate a random TikTok video.',
author: 'Jerome',
async execute(senderId, args, pageAccessToken, sendMessage) {
try {
const apiUrl = 'https://shoti.kenliejugarap.com/getvideo.php?apikey=shoti-52603bcda611603ad60ee87762f92cf70e06f96e6626a4d4b7b9f87f2887cd4876b8e78c6ce01c5095006a8d5aa172c76c66954d2faf6840249b64db723ff950470d3525fffe661f9969d8b818e2b5b9976651b426';
const response = await axios.get(apiUrl);
const videoUrl = response.data.videoDownloadLink;
//const title = response.data.title;
//const username = response.data.username;
//const tiktokUrl = response.data.tiktokUrl;

  const message = `𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖎𝖓𝖌...`;
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
