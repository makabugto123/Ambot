const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Added axios for HTTP requests
const { sendMessage } = require('./sendMessage');

const commands = new Map();
const lastImageByUser = new Map(); // Store the last image sent by each user
const lastVideoByUser = new Map(); // Store the last video sent by each user
const prefix = '-';

const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.set(command.name.toLowerCase(), command);
}

async function handleMessage(event, pageAccessToken) {
  if (!event || !event.sender || !event.sender.id) {
    console.error('Invalid event object');
    return;
  }

  const senderId = event.sender.id;

  if (event.message && event.message.attachments) {
    const imageAttachment = event.message.attachments.find(att => att.type === 'image');
    const videoAttachment = event.message.attachments.find(att => att.type === 'video');

    if (imageAttachment) {
      lastImageByUser.set(senderId, imageAttachment.payload.url);
    }
    if (videoAttachment) {
      lastVideoByUser.set(senderId, videoAttachment.payload.url);
    }
  }

  if (event.message && event.message.text) {
    const messageText = event.message.text.trim().toLowerCase();

    
    // Handling "ai" command
    if (messageText.startsWith('gemini')) {
      const lastImage = lastImageByUser.get(senderId);
      const args = messageText.split(/\s+/).slice(1);

      try {
        await commands.get('gemini').execute(senderId, args, pageAccessToken, event, lastImage);
        lastImageByUser.delete(senderId);
      } catch (error) {
        await sendMessage(senderId, { text: 'An error occurred while processing the Gemini command.' }, pageAccessToken);
      }
      return;
    }

           // Handling "remini" command
if (messageText === 'remini') {
  const lastImage = lastImageByUser.get(senderId);
  if (lastImage) {
    try {
      await commands.get('remini').execute(senderId, [], pageAccessToken, lastImage);
      lastImageByUser.delete(senderId); // Remove the image from memory after processing
    } catch (error) {
      await sendMessage(senderId, { text: '❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗽𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝘁𝗵𝗲 𝗶𝗺𝗮𝗴𝗲.' }, pageAccessToken);
    }
  } else {
    await sendMessage(senderId, { text: '❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗲𝗻𝗱 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝗳𝗶𝗿𝘀𝘁, 𝘁𝗵𝗲𝗻 𝘁𝘆𝗽𝗲 "𝗿𝗲𝗺𝗶𝗻𝗶" 𝘁𝗼 𝗲𝗻𝗵𝗮𝗻𝗰𝗲 𝗶𝘁.' }, pageAccessToken);
  }
  return;
}

    
    // Handling "zompic" command
if (messageText === 'zompic') {
  const lastImage = lastImageByUser.get(senderId);
  if (lastImage) {
    try {
      await commands.get('zompic').execute(senderId, [], pageAccessToken, lastImage);
      lastImageByUser.delete(senderId); // Remove the image from memory after processing
    } catch (error) {
      await sendMessage(senderId, { text: '❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗽𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝘁𝗵𝗲 𝗶𝗺𝗮𝗴𝗲.' }, pageAccessToken);
    }
  } else {
    await sendMessage(senderId, { text: '❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗲𝗻𝗱 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝗳𝗶𝗿𝘀𝘁, 𝘁𝗵𝗲𝗻 𝘁𝘆𝗽𝗲 "𝗿𝗲𝗺𝗶𝗻𝗶" 𝘁𝗼 𝗲𝗻𝗵𝗮𝗻𝗰𝗲 𝗶𝘁.' }, pageAccessToken);
  }
  return;
}

    // Handling "enhance" command
if (messageText === 'enhance') {
  const lastImage = lastImageByUser.get(senderId);
  if (lastImage) {
    try {
      await commands.get('enhance').execute(senderId, [], pageAccessToken, lastImage);
      lastImageByUser.delete(senderId); // Remove the image from memory after processing
    } catch (error) {
      await sendMessage(senderId, { text: '❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗽𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝘁𝗵𝗲 𝗶𝗺𝗮𝗴𝗲.' }, pageAccessToken);
    }
  } else {
    await sendMessage(senderId, { text: '❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗲𝗻𝗱 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝗳𝗶𝗿𝘀𝘁, 𝘁𝗵𝗲𝗻 𝘁𝘆𝗽𝗲 "𝗿𝗲𝗺𝗶𝗻𝗶" 𝘁𝗼 𝗲𝗻𝗵𝗮𝗻𝗰𝗲 𝗶𝘁.' }, pageAccessToken);
  }
  return;
}

    
        // Handling "gemini" command
    if (messageText.startsWith('gemini')) {
      const lastImage = lastImageByUser.get(senderId);
      const args = messageText.split(/\s+/).slice(1);

      try {
        await commands.get('gemini').execute(senderId, args, pageAccessToken, event, lastImage);
        lastImageByUser.delete(senderId);
      } catch (error) {
        await sendMessage(senderId, { text: 'An error occurred while processing the Gemini command.' }, pageAccessToken);
      }
      return;
    }
    
    // Other command processing logic...
    let commandName, args;
    if (messageText.startsWith(prefix)) {
      const argsArray = messageText.slice(prefix.length).split(' ');
      commandName = argsArray.shift().toLowerCase();
      args = argsArray;
    } else {
      const words = messageText.split(' ');
      commandName = words.shift().toLowerCase();
      args = words;
    }

    if (commands.has(commandName)) {
      const command = commands.get(commandName);
      try {
        await command.execute(senderId, args, pageAccessToken, sendMessage);
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        sendMessage(senderId, { text: `There was an error executing the command "${commandName}". Please try again later.` }, pageAccessToken);
      }
      return;
    }

    const gpt4Command = commands.get('gpt4');
    if (gpt4Command) {
      try {
        await gpt4Command.execute(senderId, [messageText], pageAccessToken);
      } catch (error) {
        console.error('Error executing Ai command:', error);
        sendMessage(senderId, { text: 'There was an error processing your request.' }, pageAccessToken);
      }
    }
  } else if (event.message) {
    console.log('Received message without text');
  } else {
    console.log('Received event without message');
  }
}

module.exports = { handleMessage };
