const Discord = require('discord.js');
const client = new Discord.Client();
var queue = new Map();
const ytdl = require('ytdl-core');
module.exports = {
    name: 'play',
    description: "Play_command, for the music bot",
    async execute(message, args){
        
        if(!args[0]) return;
        let url = args.join(" ");
        if(!url.match(/(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/)) return message.channel.send("Please provide a valid Youtube link!");

        let serverQueue = queue.get(message.guild.id);
        let vc = message.member.voice;

        if(!vc) return message.channel.send("You are not in a voice channel!");

        let songinfo = await ytdl.getInfo(url);
        let song = {
            title: songinfo.videoDetails.title,
            url: songinfo.videoDetails.video_url
        }

        if(!serverQueue) {
            let queueConst = {
                textChannel: message.channel,
                voiceChannel: vc.channel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueConst);
            queueConst.songs.push(song);

            try {
                let connection = await vc.channel.join();
                queueConst.connection = connection
                playSong(message.guild, queueConst.songs[0])
            } catch (error) {
                console.log(error);
                queue.delete(message.guild.id);
                return message.channel.send("There was an error playing the song! Error: " + error);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`)
        }
        async function playSong(guild, song) {
            let serverQueue = queue.get(guild.id);
        
            if(!song){
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
        
            const dispatcher = serverQueue.connection.play(ytdl(song.url)).on('end', () => {
                serverQueue.songs.shift();
                playSong(guild, serverQueue.songs[0]);
            })
            .on('error', () => {
                console.log(error)
            })
        
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        }
    }
}
