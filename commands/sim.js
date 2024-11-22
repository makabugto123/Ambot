const axios = require('axios');

module.exports = {
  name: 'sim',
  description: 'Talk to Sim! Type your message to get a response.',
  author: 'Jerome',
  async execute(senderid, args, pageaccesstoken, sendmessage) {
    const usermessage = args.join(' ');

    if (!usermessage) {
      return sendmessage(senderid, {
        text: formatresponse('Please type a message to Sim, e.g., `sim hello`.')
      }, pageaccesstoken);
    }

    const primaryApiUrl = `https://simsimi-api-pro.onrender.com/sim?query=${encodeURIComponent(usermessage)}`;
    const secondaryApiUrl = `https://simsimi.gleeze.com/sim?query=${encodeURIComponent(usermessage)}`;

    try {
      const response = await axios.get(primaryApiUrl);
      const simresponse = response.data.respond;

      const formattedresponse = formatresponse(simresponse);
      await sendmessage(senderid, { text: formattedresponse }, pageaccesstoken);
    } catch (error) {
      console.error('Error calling SimSimi API:', error);

      try {
        const fallbackResponse = await axios.get(secondaryApiUrl);
        const simresponse = fallbackResponse.data.respond;

        const formattedresponse = formatresponse(simresponse);
        await sendmessage(senderid, { text: formattedresponse }, pageaccesstoken);
      } catch (fallbackError) {
        console.error('Error calling fallback SimSimi API:', fallbackError);
        sendmessage(senderid, {
          text: formatresponse('Sorry, there was an error fetching a response from SimSimi. Please try again later.')
        }, pageaccesstoken);
      }
    }
  }
};

function formatresponse(responsetext) {
  const fontmap = {
    'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏',
    'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕',
    'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛',
    's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡',
    'y': '𝚢', 'z': '𝚣', 'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳',
    'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
    'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿',
    'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅',
    'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉', ' ': ' '
  };

  return responsetext.split('').map(char => fontmap[char] || char).join('');
}
