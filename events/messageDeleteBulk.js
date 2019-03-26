module.exports = {
    run: async (client, msgs) => {
            msgs.map(async msg => {
                let channel;
                let channelm;
                if (msg.channel.id == client.config.featurechannel) {
                    channel = 'features',
                    channelm = 'featuresm'
                } else if (msg.channel.id == client.config.discordchannel) {
                    channel = 'discord',
                    channelm = 'discordm'
                } else if (msg.channel.id == client.config.eventchannel) {
                    channel = 'events',
                    channelm = 'eventsm'
                } else return;
                
                const data = await client.db.table(channelm).get(msg.id).run();
                if (data && data != null) {
                    client.db.table(channel).get(data.id).delete().run();
                    client.db.table(channelm).get(msg.id).delete().run();
                } else return;            
            });
    }
}