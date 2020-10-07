var queue = new Map();
const ytdl = require('ytdl-core');
module.exports = {
    name: 'playsong',
    description: "playsong for the music bot quene stuff",
    execute(messages, args){
        if(args[0]) {
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
}



