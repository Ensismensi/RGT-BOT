const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
if (config.token == "") {
    console.error("You need to provide a token!")
    process.exit(2)
}
client.on('ready', () => {
  console.log('I am ready!');
});
client.on('message', message => {
    if (message.content === '!verify') {

    } else if (message.content === '!die') {

    }
})
client.login(config.token);