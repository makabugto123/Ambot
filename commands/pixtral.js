const axios = require("axios");

module.exports.config = {
  name: "pixtral",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "ai",
  description: "Get answers from the AI (Pixtral).",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = async function ({ event, args }) {
  if (args.length < 1) {
    return api.sendMessage(
      "Usage: Pixtral <question>\nExample: Pixtral what is life?",
      event.sender.id
    );
  }

  const question = args.join(" ");
  let imageUrls = [];

  try {
    if (event.type === "message_reply" && event.message.reply_to?.mid) {
      const replyMid = event.message.reply_to.mid;

      try {
        const replyResponse = await api.messageReply(replyMid);

        if (replyResponse.response?.attachments?.data?.length) {
          imageUrls = replyResponse.response.attachments.data
            .slice(0, 5)
            .map((attachment) => encodeURIComponent(attachment.image_data?.url))
            .filter(Boolean);
        }
      } catch (err) {
        return api.sendMessage(
          "❌ Failed to fetch reply-to message. Please try again later.",
          event.sender.id
        );
      }
    }

    if (imageUrls.length === 0 && event.message?.attachments?.length > 0) {
      imageUrls = event.message.attachments
        .slice(0, 5)
        .map((attachment) => encodeURIComponent(attachment.payload?.url))
        .filter(Boolean);
    }

    let apiUrl = `https://api.kenliejugarap.com/pixtral-paid/?question=${encodeURIComponent(question)}`;
    if (imageUrls.length > 0) {
      apiUrl += `&image_url=${imageUrls.join("|")}`;
    }

    api.sendMessage("Answering your question, please wait...", event.sender.id);

    axios
      .get(apiUrl)
      .then((response) => {
        const res = response.data;

        if (res.status) {
          api.sendMessage(res.response, event.sender.id);
        } else {
          api.sendMessage(
            "❌ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) to get this fixed.",
            event.sender.id
          );
        }
      })
      .catch((err) => {
        api.sendMessage(
          "❌ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) to get this fixed.",
          event.sender.id
        );
      });
  } catch (error) {
    api.sendMessage(
      "❌ An unexpected error occurred. Please try again later.",
      event.sender.id
    );
  }
};
