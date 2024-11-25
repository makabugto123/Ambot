const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

// Define and export module
module.exports = {
  // Metadata for the command
  name: 'enhance',  // Command name
  description: 'Enhance Your Picture',  // Description
  usage: 'enhance',  // Usage
  author: 'MakoyQx',  // Author of the command

  // Main function that executes the command
  async execute(senderId, args, pageAccessToken, imageUrl) {
    // Check if prompt arguments are provided
    if (!imageUrl) {
      return sendMessage(senderId, {
        text: `❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗲𝗻𝗱 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝗳𝗶𝗿𝘀𝘁, 𝘁𝗵𝗲𝗻 𝘁𝘆𝗽𝗲 "𝗿𝗲𝗺𝗶𝗻𝗶" 𝘁𝗼 𝗲𝗻𝗵𝗮𝗻𝗰𝗲 𝗶𝘁.`
      }, pageAccessToken);
    }
    
    // Notify the user that enhancement is in progress
    sendMessage(senderId, { text: "⌛ 𝗘𝗻𝗵𝗮𝗻𝗰𝗶𝗻𝗴 𝗶𝗺𝗮𝗴𝗲 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...." }, pageAccessToken);

    // Concatenate arguments to form the prompt
    const prompt = args.join(' ');
    const apiUrl = `https://api.kenliejugarap.com/imgenhanced/?scale=0&imgurl=${encodeURIComponent(imageUrl)}`;  // API endpoint with the prompt

    // Notify user that the image is being generated

    try {
      // Send the generated image to the user as an attachment
      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            url: apiUrl  // URL of the generated image
          }
        }
      }, pageAccessToken);

    } catch (error) {
      // Handle and log any errors during image generation
      console.error('Error generating image:', error);
      
      // Notify user of the error
      await sendMessage(senderId, {
        text: 'An error occurred while generating the image. Please try again later.'
      }, pageAccessToken);
    }
  }
};
