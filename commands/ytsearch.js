const axios = require('axios');

module.exports = {
  name: 'ytsearch',
  description: 'Search song for youtube!',
  author: 'Dale Mekumi', 
  usage: 'ytsearch  song title',
  async execute(senderId, args, pageAccessToken, sendMessage) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: ytsearch songtitle" }, pageAccessToken);
    
    sendMessage(senderId, { text: "⚙ Searching Song please wait..." }, pageAccessToken);

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/music?q=${encodeURIComponent(prompt)}`);
      const title = response.data.title;
      const mp3Link = response.data.mp3Link;
      const duration = response.data.duration;
      const thumbnail = response.data.thumbnail;
    //  const duration = response.data.duration;
    //  const genres = response.data.genres;
   //   const description = response.data.description;
    //  const url = response.data.url;
    //  const picture = response.data.picture;

      const picmessage = {
    attachment: {
      type: 'image',
      payload: {
        url: thumbnail,
      },
    },
  };
  await sendMessage(senderId, picmessage, pageAccessToken);

      sendMessage(senderId, { 
        text: `Song Information\n\nTitle: ${title}\n\n Duration: ${duration}\n\\n` 
      }, pageAccessToken);

      //send Audio File
      const picmessage = {
    attachment: {
      type: 'audio',
      payload: {
        url: mp3Link,
      },
    },
  };
  await sendMessage(senderId, picmessage, pageAccessToken);

    } catch (error) {
      console.error(error);
      sendMessage(senderId, { text: `❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}` }, pageAccessToken);
    }
  }
};
