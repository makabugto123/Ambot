module.exports = {
  config: {
    name: "id",
    description: "Get your ID",
    usage: "id",
  },
  run: async ({ api, senderId }) => {
    await api.sendMessage(senderId, `Your ID: ${senderId}`);
  },
};
