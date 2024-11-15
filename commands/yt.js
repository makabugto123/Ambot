const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'yt',
  description: 'Search and send audio files',
  usage: 'yt [title]',
  author: 'Kasoooooy/Makoy',
  async execute(senderId, args, pageAccessToken) {

     const prompt = args.join(' ');
     if (!prompt) return sendMessage(senderId, { text: "Usage: yt <title>" }, pageAccessToken);
    
    const apiUrl = `https://apis-markdevs69v2.onrender.com/new/api/youtube?q=${encodeURIComponent(prompt)}`;  // API endpoint with the prompt


    try {
      // Send a message indicating that the image is being fetched
      await sendMessage(senderId, {
        text: '⌛ 𝗙𝗲𝘁𝗰𝗵𝗶𝗻𝗴 Youtube Search 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...'
      }, pageAccessToken);

      // Fetch the couple DP from the API
      const response = await axios.get(apiUrl);
      const title = response.data.title;
      const timestamp = response.data.timestamp;
      const name = response.data.name;
      //const thumb = response.data.thumbnail;
      const link = response.data.url;

  

      // Send the female DP image
      const mes = `Title: ${title}\nSinger: ${name}\nDuration: ${thumb}\nLink: ${link}\n\n𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖎𝖓𝖌 𝕻𝖑𝖊𝖆𝖘𝖊 𝖂𝖆𝖎𝖙...`;
      await sendMessage(senderId, mes, pageAccessToken);
    } catch (error) {
      console.error('Error fetching youtube:', error);
      await sendMessage(senderId, {
        text: 'An error occurred while fetching the youtube. Please try again later.'
      }, pageAccessToken);
    }
  }
};
