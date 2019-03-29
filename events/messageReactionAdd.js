module.exports = {
    run: async (client, messageReaction, user) => {
        let channel;
        if (messageReaction.message.channel.id == client.config.featurechannel) {
            channel = 'features'        
        } else if (messageReaction.message.channel.id == client.config.discordchannel) {
            channel = 'discord'
        } else if (messageReaction.message.channel.id == client.config.eventchannel) {
            channel = 'events'        
        } 
        
        if (messageReaction.emoji.id == '546435721444196353') {
            if (user.id == messageReaction.message.author.id) return messageReaction.remove(user);
            if (user.id != client.user.id) {
                const data = await client.db.table(channel).filter({ message: messageReaction.message.id }).run();
                data.forEach(d => {
                    const num2insert = d.number+1
                    client.db.table(channel).get(d.id).update({ number: num2insert }).run();                   
                });
            } else return;
        } else return; 
    }
}