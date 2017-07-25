const fs = require('fs');
const config = require('./config.json');
const roblox = require('roblox-js');
const Discord = require('discord.js');
const client = new Discord.Client();
const uuid = require('uuid');
if (config.token == "") {
    console.error("You need to provide a token!")
    process.exit(2)
}
let activeverifies = new Map()
let ids = new Map()
client.on('ready', () => {
  console.log('I am ready!');
  client.guilds.array().forEach(function(element) {
    activeverifies.set(element.id, new Map())
}, this);
});

client.on('message', message => {
    if (message.channel.id == config.channel) {
    if (message.content === '!verify') {
        if (message.member.roles.has(config.role)) {
            message.reply("You are already verified!")
        } else {
            message.channel.send({embed: {
                title: "Verification instructions",
                description: "To verify your account with roblox, please type your username.",
            }})
            activeverifies.get(message.guild.id).set(message.author.id, 1)            
        }
    } else if (message.content == "!cancel") {
        activeverifies.get(guild.id).delete(message.author.id)
    } else if (message.content === '!die' && message.author.id == config.owner) {
        client.destroy;
        process.exit(0);
    } else if (activeverifies.get(message.guild.id).get(message.author.id) == 1) {
        roblox.getIdFromUsername(message.content).then((id) => {
            message.reply("Perfect! Give me a moment.\n(i think ur id is "+id+")");
             let theid = getRandomArbitrary(100000,999999).toString()
                message.channel.send({embed: {
                title: "Verification",
                description: "Okay, now add the text `"+theid+"` to your roblox profile description and send anything when done. I'll be waiting!"
             }});
            ids.set(message.author.id, [id, theid, message.content]);             
            activeverifies.get(message.guild.id).set(message.author.id, 2);
        }).catch( (reason) => {
            message.reply("Mission failed with: " + reason.toString())
            activeverifies.get(message.guild.id).delete(message.author.id);
        })
    } else if (activeverifies.get(message.guild.id).get(message.author.id) == 2) {
        let id = ids.get(message.author.id)
        roblox.getBlurb(id[0]).then((blurb) => {
            if (blurb.includes(id[1])) {
                message.channel.send({embed: {
                    title: "Verification complete!",
                    description: "You did it!"
                }})
                message.member.addRole(config.role)
                message.member.setNickname(id[2])
            } else {
                message.reply("I couldnt find that in your description...\n Try again? `!verify`")
            }
            activeverifies.get(message.guild.id).delete(message.author.id)
        }).catch( (reason) => {
            message.reply("Errored with: " + reason.toString())
            activeverifies.get(message.guild.id).delete(message.author.id);
        })
    }}
    //here
})
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
client.login(config.token);