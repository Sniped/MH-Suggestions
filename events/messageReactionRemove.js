module.exports = {
    run: async (client, messageReaction, user) => {
        let channel;
        if (messageReaction.message.channel.id == client.config.featurechannel) {
            channel = 'features'
        } else if (messageReaction.message.channel.id == client.config.discordchannel) {
            channel = 'discord'                                 
        } else if (messageReaction.message.channel.id == client.config.eventchannel) {
            channel = 'events'
        } else return;

        if (messageReaction.emoji.id == '546435721444196353') {
            if (user.id == client.user.id) return;
            const data = await client.db.table(channel).filter({ message: messageReaction.message.id }).run();
            data.forEach(d => {
                const num2insert = d.number-1
                if (num2insert < 0) return;
                client.db.table(channel).get(d.id).delete().run();
            });
        } else return;
    }
}