const axios = require('axios');

module.exports = {
  name: 'teach',
  usage: 'teach mes => to reply',
  description: 'Teach SimSimi using the format question => answer.',
  author: 'Jerome',
  async execute(senderid, args, pageaccesstoken, sendmessage) {
    const text = args.join(" ");

    const text1 = text.substr(0, text.indexOf(' => ')).trim();
    const text2 = text.split(' => ').pop().trim();

    if (!text1 || !text2) {
      return sendmessage(senderid, {
        text: formatresponse('Please provide both a question and an answer. Example: teachsim hi => hello')
      }, pageaccesstoken);
    }

    const primaryApiUrl = `https://simsimi-api-pro.onrender.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`;
    const secondaryApiUrl = `https://simsimi.gleeze.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`;

    try {
      const response = await axios.get(primaryApiUrl);

      if (response.data.status === 200) {
        const teachResponse = response.data.teachResponse.respond;
        const successMessage = teachResponse.includes('already exists')
          ? formatresponse(`SimSimi already knows the answer for question "${text1}".`)
          : formatresponse(`SimSimi learned this new answer for question "${text1}": ${teachResponse}`);

        sendmessage(senderid, {
          text: formatresponse(`Your question: ${text1}\nSimSimi's response: ${text2}\n${successMessage}`)
        }, pageaccesstoken);
      } else {
        throw new Error('Primary API response error');
      }
    } catch (error) {
      console.warn('Primary API failed, switching to secondary API:', error.message);

      try {
        const fallbackResponse = await axios.get(secondaryApiUrl);

        if (fallbackResponse.data.status === 200) {
          const teachResponse = fallbackResponse.data.teachResponse.respond;
          const successMessage = teachResponse.includes('already exists')
            ? formatresponse(`SimSimi already knows the answer for question "${text1}".`)
            : formatresponse(`SimSimi learned this new answer for question "${text1}": ${teachResponse}`);

          sendmessage(senderid, {
            text: formatresponse(`Your question: ${text1}\nSimSimi's response: ${text2}\n${successMessage}`)
          }, pageaccesstoken);
        } else {
          throw new Error('Secondary API response error');
        }
      } catch (fallbackError) {
        console.error("Both APIs failed:", fallbackError.message);
        sendmessage(senderid, {
          text: formatresponse('Both SimSimi APIs are unavailable. Please try again later.')
        }, pageaccesstoken);
      }
    }
  }
};

function formatresponse(responsetext) {
  const fontmap = {
    'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿',
    'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅',
    'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋',
    's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑',
    'y': '𝗒', 'z': '𝗓',
    'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥',
    'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫',
    'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱',
    'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷',
    'Y': '𝖸', 'Z': '𝖹', ' ': ' '
  };

  return responsetext.split('').map(char => fontmap[char] || char).join('');
}
