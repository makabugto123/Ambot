const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'pdf',
  description: 'search pdf file for your prompt.',
  usage: 'pdf [text]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    try {
      const { data } = await axios.get(`https://myapi-2f5b.onrender.com/pdf?find=${encodeURIComponent(args.join(' '))}&count=1`);
      const link = data[0]?.url;

      sendMessage(senderId, link ? {
        attachment: { type: 'pdf', payload: { url: link, is_reusable: true } }
      } : { text: 'Sorry, no pdf link found for that query.' }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};
