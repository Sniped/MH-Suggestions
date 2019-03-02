module.exports = {
    run: async (client, messageReaction, user) => {
        let channel;
        let channelm;
        if (messageReaction.message.channel.id == client.config.featurechannel) {
            channel = 'features',
            channelm = 'featuresm'
        } else if (messageReaction.message.channel.id == client.config.pluginchannel) {
            channel = 'plugins',
            channelm = 'pluginsm'
        } else if (messageReaction.message.channel.id == client.config.discordchannel) {
            channel = 'discord',
            channelm = 'discordm'
        } else if (messageReaction.message.channel.id == client.config.eventchannel) {
            channel = 'events',
            channelm = 'eventsm'
        } else return;

        if (messageReaction.emoji.id == '546435721444196353') {
            try {
                if (user.id == client.user.id) return;
                const data = await client.db.table(channel).get(messageReaction.message.id).run();
                const num2insert = data.number-1
                client.db.table(channel).get(messageReaction.message.id).update({ number: num2insert }).run();
                client.db.table(channelm).get(data.id).update({ number: num2insert }).run();
            } catch (err) {
                return;
            }
        } else return;
    }
}