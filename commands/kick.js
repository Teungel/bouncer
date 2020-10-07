module.exports = {
    name: 'kick',
    description: "Kick_Command",
    execute(message, args){
        let member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.channel.send(`:wave: ${member.displayName} has been kicked`);
                }).catch(() => {
                    if (!message.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
                        message.reply("You cannot kick members");
                    } else if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {
                        message.reply("You cannont kick this member");
            }
                });
}
}