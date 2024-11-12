
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
name: 'try',
usage: 'try',
description: 'Send Music Using Title.',
author: 'Jerome',
async execute(senderId, args, pageAccessToken, sendMessage) {
try {
const apiUrl = 'https://hiroshi-api.onrender.com/tiktok/spotify?search=${encodeURIComponent(args.join(' '))}';
const response = await axios.get(apiUrl);
const dlink = response.data.download;
const title = response.data.name;
const img = response.data.image;
//const displayname = response.data.displayname;

  const message = `Title: ${title}\n𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖎𝖓𝖌 𝕻𝖑𝖊𝖆𝖘𝖊 𝖂𝖆𝖎𝖙...
`;
  await sendMessage(senderId, { text: message }, pageAccessToken);

const imageMessage = {
    attachment: {
      type: 'image',
      payload: {
        url: img,
      },
    },
  };
  await sendMessage(senderId, imageMessage, pageAccessToken);


  const audioMessage = {
    attachment: {
      type: 'audio',
      payload: {
        url: dlink,
        is_reusable: true,
      },
    },
  };
  await sendMessage(senderId, audioMessage, pageAccessToken);
} catch (error) {
  console.error('Error:', error.message);
  sendMessage(senderId, {
    text: 'Sorry, there was an error generating the Audio. Please try again later.',
  }, pageAccessToken);
}

},
};
