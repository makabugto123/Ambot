const axios = require('axios');

module.exports = {
  name: 'aidetect',
  description: 'Detect if the sentence is AI generated text!',
  author: 'Dale Mekumi', 
  usage: 'aidetect texthere',
  async execute(senderId, args, pageAccessToken, sendMessage) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: aidetect text here" }, pageAccessToken);
    
    sendMessage(senderId, { text: "⚙ Detecting Text Please Wait..." }, pageAccessToken);

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/aidetector-v2?q=${encodeURIComponent(prompt)}`);
      const ai = response.data.author;
      const human = response.data.human;
      const mess = response.data.message;
      const wordcount = response.data.wordcount;
      const characters = response.data.characters;
      //const genres = response.data.genres;
      //const description = response.data.description;
      //const url = response.data.url;
      //const picture = response.data.picture;

      

      sendMessage(senderId, { 
        text: `AI DETECTOR\n\nAI STATUS: ${ai}\n\n HUMAN STATUS: ${human}\n\nMESSAGE: ${mes}\n\nWORD COUNT: ${wordcount}\n\nCharacters: ${characters}\n\n` 
      }, pageAccessToken);
    } catch (error) {
      console.error(error);
      sendMessage(senderId, { text: `❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}` }, pageAccessToken);
    }
  }
};
