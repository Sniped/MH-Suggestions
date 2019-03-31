module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: Invalid arguments! Valid arguments are `feature`, `discord`, and `event`');
        if (!args[0] == 'event') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID!');
            if (!Number(args[1])) return msg.channel.send(':x: ID must be a number');
            if (args[2] == '-a') {
                const id = parseInt(args[1], 10);
                const data = await client.db.table('featuresa').get(id).run();
                client.channels.get(client.config.featureachannel).fetchMessage(data.message).then(msg => {
                    if (msg) msg.delete();
                });
                client.db.table('features').get(id).delete().run();
                msg.channel.send(`:white_check_mark: Deleted feature suggestion **${id}**`);                
            } else {
                const id = parseInt(args[1], 10);
                const data = await client.db.table('features').get(id).run();
                client.channels.get(client.config.featurechannel).fetchMessage(data.message).then(msg => {
                    if (msg) msg.delete();
                });
                client.db.table('features').get(id).delete().run();
                msg.channel.send(`:white_check_mark: Deleted feature suggestion **${id}**`);
            }
        } else if (!args[0] == 'discord') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID!');
            if (!Number(args[1])) return msg.channel.send(':x: ID must be a number');
            if (args[2] == '-a') {
                const id = parseInt(args[1], 10);
                const data = await client.db.table('discorda').get(id).run();
                client.channels.get(client.config.discordachannel).fetchMessage(data.message).then(msg => {
                    if (msg) msg.delete();
                });
                client.db.table('discord').get(id).delete().run();
                msg.channel.send(`:white_check_mark: Deleted discord suggestion **${id}**`);                
            } else {
                const id = parseInt(args[1], 10);
                const data = await client.db.table('discord').get(id).run();
                client.channels.get(client.config.discordchannel).fetchMessage(data.message).then(msg => {
                    if (msg) msg.delete();
                });
                client.db.table('discord').get(id).delete().run();
                msg.channel.send(`:white_check_mark: Deleted discord suggestion **${id}**`);
            }
        } else if (!args[0] == 'events') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID!');
            if (!Number(args[1])) return msg.channel.send(':x: ID must be a number');
            if (args[2] == '-a') {
                const id = parseInt(args[1], 10);
                const data = await client.db.table('eventsa').get(id).run();
                client.channels.get(client.config.eventachannel).fetchMessage(data.message).then(msg => {
                    if (msg) msg.delete();
                });
                client.db.table('events').get(id).delete().run();
                msg.channel.send(`:white_check_mark: Deleted event suggestion **${id}**`);                
            } else {
                const id = parseInt(args[1], 10);
                const data = await client.db.table('events').get(id).run();
                client.channels.get(client.config.eventchannel).fetchMessage(data.message).then(msg => {
                    if (msg) msg.delete();
                });
                client.db.table('events').get(id).delete().run();
                msg.channel.send(`:white_check_mark: Deleted event suggestion **${id}**`);
            }
        }
    },
    meta: {
        aliases: ['delete', 'del'],
        description: 'Delete a certain suggestion from a certain category.',
        permlvl: 4,
        usage: ''           
    }
}