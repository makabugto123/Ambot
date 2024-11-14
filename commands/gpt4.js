const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gpt4',
  description: 'Interact with GPT-4o',
  usage: 'gpt4 [your message]',
  author: 'coffee',

  async execute(senderId, args) {
    const pageAccessToken = 'your_token_here'; // You can hardcode or replace this with the desired token

    const input = (args.join(' ') || 'hello').trim();
    await handleChatResponse(senderId, input, pageAccessToken);
  },
};

const handleChatResponse = async (senderId, input, pageAccessToken) => {
  const systemRole = 'you are Mocha AI, an AI assistant.';
  const prompt = `${systemRole}\n${input}`;
  const apiUrl = `https://joshweb.click/gpt4?prompt=${encodeURIComponent(prompt)}&uid=${senderId}`;

  try {
    const { data } = await axios.get(apiUrl);
    const responseText = data.gpt4 || 'No response from the API.';
    const formattedMessage = `${responseText}`;

    await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
  } catch (error) {
    console.error('Error reaching the API:', error);
    await sendError(senderId, 'An error occurred while trying to reach the API.', pageAccessToken);
  }
};

const sendError = async (senderId, errorMessage, pageAccessToken) => {
  const formattedMessage = `${errorMessage}`;
  await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
};
