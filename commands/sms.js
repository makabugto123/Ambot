const axios = require('axios');

module.exports = {
  name: 'sms',
  description: 'Send sms for free!',
  author: 'Dale Mekumi', 
  usage: 'sms phone# | message',
  async execute(senderId, args, pageAccessToken, sendMessage) {

    const prompt = args.join(' ');
    
    const text1 = prompt.substr(0, prompt.indexOf(' | ')).trim();
    const text2 = prompt.split(' | ').pop().trim();




    if (!prompt) return sendMessage(senderId, { text: "Usage: sms 09123456789 | hi" }, pageAccessToken);
    
    sendMessage(senderId, { text: "⚙ Sending Message Please Wait..." }, pageAccessToken);

    try {
      const response = await axios.get(`https://api.kenliejugarap.com/freesmslbc/?number=${encodeURIComponent(text1)}&message=${encodeURIComponent(text2)}`);
      const resp = response.data.response;
      const sim_network = response.data.sim_network;
      //const mess = response.data.message;
      //const wordcount = response.data.wordcount;
      //const characters = response.data.characters;
      //const genres = response.data.genres;
      //const description = response.data.description;
      //const url = response.data.url;
      //const picture = response.data.picture;

      

      sendMessage(senderId, { 
        text: `SMS FREE TEXT\n\nSTATUS: ${resp}\n\n SIM NETWORK: ${sim_network}\n\n` 
      }, pageAccessToken);
    } catch (error) {
      console.error(error);
      sendMessage(senderId, { text: `❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}` }, pageAccessToken);
    }
  }
};
