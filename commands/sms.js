const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'sms',
  description: 'Send Free Text',
  usage: 'sms phone# | yourmessage',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {

    const text = args.join(" ");

    const text1 = text.substr(0, text.indexOf(' | ')).trim();
    const text2 = text.split(' | ').pop().trim();

    if (!text1 || !text2) {
      return sendmessage(senderid, {
        text: formatresponse('Please provide both a question and an answer. Example: 09123456789 | yourmessage')
      }, pageaccesstoken);
    }

    try {
       const response = await axios.get(`https://api.kenliejugarap.com/freesmslbc/?number=${encodeURIComponent(text1)}&message=${encodeURIComponent(text2)}`);
       
    const respo = response.data.response;
      const simnet = response.data.sim_network;
      
      const message = `Message: ${respo}\nSending Text: ${text2}\nSend To: ${text1}\nNetwork: ${simnet}\n
`;
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
