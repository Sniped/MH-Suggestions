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
        } else if (messageReaction.message.channel.id == '546800461387399184') {
             if (messageReaction.emoji.name == '👍') {
                const guildu = client.guilds.get('546414872196415501').members.get(user.id);
                const uData = await client.db.table('userData').get(user.id).run();
                if (guildu.roles.has(client.config.staffroleid)) {
                    messageReaction.remove(user);
                 } else if (guildu.roles.has(client.config.councilid)) {
                    messageReaction.remove(user);
                 } else if (uData.banned == true) {
                    messageReaction.remove(user);
                 } else return user.send(':white_check_mark: Your vote has been accounted for!');             
             }
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