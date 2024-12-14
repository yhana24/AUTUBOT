const { exec } = require('child_process');

module.exports.config = {
  name: 'shell',
  version: '1.0.0',
  role: 1,
  hasPrefix: false,
  aliases: ['run', 'cmd'],
  description: 'Run shell commands',
  usage: 'shell [command]',
  credits: 'Joshua Apostol',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const command = args.join(' ');

  if (!command) {
    return api.sendMessage('Missing input.', event.threadID, event.messageID);
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return api.sendMessage(`Error Output:\n${error.message}`, event.threadID, event.messageID);
    }
    if (stderr) {
      return api.sendMessage(`Error Output:\n${stderr}`, event.threadID, event.messageID);
    }
    return api.sendMessage(`Output:\n${stdout}`, event.threadID, event.messageID);
  });
};
