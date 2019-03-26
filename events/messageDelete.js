module.exports = {
    run: async (client, msg) => {
        let channel;
        let channelm;
        if (msg.channel.id == client.config.featurechannel) {
            channel = 'features',
            channelm = 'featuresm'
            updateDB(channel, channelm, msg);
        } else if (msg.channel.id == client.config.discordchannel) {
            channel = 'discord',
            channelm = 'discordm'
            updateDB(channel, channelm, msg);
        } else if (msg.channel.id == client.config.eventchannel) {
            channel = 'events',
            channelm = 'eventsm'
            updateDB(channel, channelm, msg);
        } else if (msg.channel.id == client.config.metachannel) {
            const user = await client.db.table(userData).get(msg.author.id).run();
            const newact = user.activity - 1
            client.db.table('userData').get(msg.author.id).update({ activity: newact }).run();
        }
        
        async function updateDB(channel, channelm, msg) {
            const data = await client.db.table(channelm).get(msg.id).run();
            if (data && data != null) {
                client.db.table(channel).get(data.id).delete().run();
                client.db.table(channelm).get(msg.id).delete().run();
            } else return;
        }
    }
}