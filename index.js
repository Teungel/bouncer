
const Discord = require('discord.js');
const client = new Discord.Client();
const token = ' [your token]   '
const prefix = 'L ';
const fs = require('fs');
var queue = new Map();
const ytdl = require('ytdl-core');
const yts = require("yt-search");

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('This bot is online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } 
    if(command === 'info'){
        client.commands.get('info').execute(message, args);
    } 
    if(command === 'version'){
        client.commands.get('version').execute(message, args);
    } 
    if(command === 'ban'){
        client.commands.get('ban').execute(message, args);
    } 
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args);
    } 
    if(command === 'play2'){
        client.commands.get('play2').execute(message, args);
    } 
    if(command === 'play'){
        client.commands.get('play').execute(message, args);
    } 
});
 
client.login(token);
    /**
 * 
 * @param {Discord.Guild} guild 
 * @param {Object} song 
 */
 
