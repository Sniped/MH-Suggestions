module.exports = {
    run: async (client, msgs) => {
            msgs.map(async msg => {
                let channel;
                if (msg.channel.id == client.config.featurechannel) {
                    channel = 'features'
                } else if (msg.channel.id == client.config.discordchannel) {
                    channel = 'discord'
                } else if (msg.channel.id == client.config.eventchannel) {
                    channel = 'events'                
                } else return;
                
                const data = await client.db.table(channel).filter({ message: msg.id }).run();
                data.forEach(d => {
                    client.db.table(channel).get(d.id).delete().run();
                });
            });
    }
}