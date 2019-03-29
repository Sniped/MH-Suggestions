module.exports = {
    run: async (client, msg) => {
        let channel;
        if (msg.channel.id == client.config.featurechannel) {
            channel = 'features'
            updateDB(channel, msg);
        } else if (msg.channel.id == client.config.discordchannel) {
            channel = 'discord'
            updateDB(channel, msg);
        } else if (msg.channel.id == client.config.eventchannel) {
            channel = 'events'
            updateDB(channel, msg);
        } else if (msg.channel.id == client.config.metachannel) {
            const user = await client.db.table(userData).get(msg.author.id).run();
            const newact = user.activity - 1
            client.db.table('userData').get(msg.author.id).update({ activity: newact }).run();
        }
        
        async function updateDB(channel, msg) {
            const data = await client.db.table(channel).filter({ message: msg.id }).run();
            data.forEach(d => {
                client.db.table(channel).get(d.id).delete().run();
            });
        }
    }
}