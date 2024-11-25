const axios = require('axios');

module.exports = {
  name: 'aidetect',
  description: 'Detect if the sentence is AI generated text!',
  author: 'Dale Mekumi', 
  usage: 'aidetect texthere',
  async execute(senderId, args, pageAccessToken, sendMessage) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "𝙐𝙨𝙖𝙜𝙚: 𝙖𝙞𝙙𝙚𝙩𝙚𝙘𝙩 𝙩𝙚𝙭𝙩 𝙝𝙚𝙧𝙚" }, pageAccessToken);
    
    sendMessage(senderId, { text: "⚙ 𝑫𝒆𝒕𝒆𝒄𝒕𝒊𝒏𝒈 𝑻𝒆𝒙𝒕 𝑷𝒍𝒆𝒂𝒔𝒆 𝑾𝒂𝒊𝒕..." }, pageAccessToken);

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/aidetector-v2?q=${encodeURIComponent(prompt)}`);
      const ai = response.data.ai;
      const human = response.data.human;
      const mess = response.data.message;
      const wordcount = response.data.wordcount;
      const characters = response.data.characters;
      //const genres = response.data.genres;
      //const description = response.data.description;
      //const url = response.data.url;
      //const picture = response.data.picture;

      const responseTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', hour12: true });
      

      sendMessage(senderId, { 
        text: `𝘼𝙄 𝘿𝙀𝙏𝙀𝘾𝙏𝙊𝙍\n\n🤖𝘼𝙄 𝙎𝙏𝘼𝙏𝙐𝙎: ${ai}\n\n 🙎𝙃𝙐𝙈𝘼𝙉 𝙎𝙏𝘼𝙏𝙐𝙎: ${human}\n\n💌𝙈𝙀𝙎𝙎𝘼𝙂𝙀: ${mess}\n\n👁️‍🗨️𝙒𝙊𝙍𝘿 𝘾𝙊𝙐𝙉𝙏: ${wordcount}\n\n👁️‍🗨️𝘾𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧𝙨: ${characters}\n\n⏰ 𝗔𝘀𝗶𝗮/𝗠𝗮𝗻𝗶𝗹𝗮: ${responseTime}\n\n` 
      }, pageAccessToken);
    } catch (error) {
      console.error(error);
      sendMessage(senderId, { text: `❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}` }, pageAccessToken);
    }
  }
};
