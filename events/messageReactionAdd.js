module.exports = {
    run: async (client, messageReaction, user) => {
        let channel;
        let channelm;
        if (messageReaction.message.channel.id == client.config.featurechannel) {
            channel = 'features',
            channelm = 'featuresm'
        } else if (messageReaction.message.channel.id == client.config.discordchannel) {
            channel = 'discord',
            channelm = 'discordm'
        } else if (messageReaction.message.channel.id == client.config.eventchannel) {
            channel = 'events',
            channelm = 'eventsm'
        } 
        

        if (messageReaction.emoji.id == '546435721444196353') {
            if (user.id == messageReaction.message.author.id) return messageReaction.remove(user);
            if (user.id != client.user.id) {
                const data = await client.db.table(channelm).get(messageReaction.message.id).run();
                const num2insert = data.number+1
                client.db.table(channelm).get(messageReaction.message.id).update({ number: num2insert }).run();
                client.db.table(channel).get(data.id).update({ number: num2insert }).run();
            } else return;
        } else return; 
    }
}