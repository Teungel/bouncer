module.exports = {
    name: 'ping',
    description: "ping command, just here for testing purposes",
    execute(message, args){
        message.channel.send('pong');
    }
}