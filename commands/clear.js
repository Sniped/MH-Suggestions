module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: You must include the amount of messages you\'d like to clear.');
        if (Number(args[0]) == NaN) return msg.channel.send(':x: The amount of messages you want to be cleared must be a number.');
        const msgs = parseInt(args[0], 10);
        if (msgs >= 2) {
            if (msgs <= 100) {
                const channel = client.channels.get(msg.channel.id);
                msg.delete();
                channel.bulkDelete(msgs).then(() => {
                    msg.channel.send(`:white_check_mark: Cleared ${msgs} messages!`).then(cmsg => {
                        setTimeout(function() {
                            cmsg.delete();
                        }, 5000);
                    });
                });
            } else return msg.channel.send(':x: Your number must be lower than 100.');
        } else return msg.channel.send(':x: Your number must be above 1.');
    },
    meta: {
        aliases: ['clear'],
        description: 'Clears a specific amount of messages',
        permlvl: 4,
        usage: ''        
    }
}