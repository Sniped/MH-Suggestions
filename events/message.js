const fs = require('fs');
module.exports = {
    run: async (client, msg) => {
        if (msg.author.bot) return;

        else if (msg.content.startsWith(client.config.prefix)) {
            const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            try {
                fs.readdir('commands', (err, files) => {
                    if (err) return console.error(err);
                    files.forEach(async file => {
                        const meta = require('../commands/' + file).meta;
                        const perms = client.elevation(msg);
                        if (meta.aliases.includes(command)) {
                            if (meta.permlvl > perms) return;
                            return require('../commands/' + file).run(client, msg, args);    
                        }
                    });    
                });
            } catch (err) {
                console.log(err);
            }
        } else if (msg.channel.id == client.config.featurechannel && msg.author.id != client.user.id) {
            msg.react(client.emojis.get('546435721444196353'))
            .then(msg.react(client.emojis.get('546435753719103488')));
            const nData = await client.db.table('nData').get('features').run();
            const id = nData.number
            const num2insert = nData.number+1
            client.db.table('nData').get('features').update({ number: num2insert }).run();
            client.db.table('features').insert({ id: id, message: msg.id, number: 0 }).run();
            client.db.table('featuresm').insert({ message: msg.id, id: id, number: 0 }).run();            
        } else if (msg.channel.id == client.config.pluginchannel && msg.author.id != client.user.id) {
            msg.react(client.emojis.get('546435721444196353'))
            .then(msg.react(client.emojis.get('546435753719103488')));
            const nData = await client.db.table('nData').get('plugins').run();
            const id = nData.number
            const num2insert = nData.number+1
            client.db.table('nData').get('plugins').update({ number: num2insert }).run();
            client.db.table('plugins').insert({ id: id, message: msg.id, number: 0 }).run();
            client.db.table('pluginsm').insert({ message: msg.id, id: id, number: 0 }).run();           
        } else if (msg.channel.id == client.config.discordchannel && msg.author.id != client.user.id) {
            msg.react(client.emojis.get('546435721444196353'))
            .then(msg.react(client.emojis.get('546435753719103488')));
            const nData = await client.db.table('nData').get('discord').run();
            const id = nData.number
            const num2insert = nData.number+1
            client.db.table('nData').get('discord').update({ number: num2insert }).run();
            client.db.table('discord').insert({ id: id, message: msg.id, number: 0 }).run();
            client.db.table('discordm').insert({ message: msg.id, id: id, number: 0 }).run();            
        } else if (msg.channel.id == client.config.eventchannel && msg.author.id != client.user.id) {
            msg.react(client.emojis.get('546435721444196353'))
            .then(msg.react(client.emojis.get('546435753719103488')));
            const nData = await client.db.table('nData').get('events').run();
            const id = nData.number
            const num2insert = nData.number+1
            client.db.table('nData').get('events').update({ number: num2insert }).run();
            client.db.table('events').insert({ id: id, message: msg.id, number: 0 }).run();
            client.db.table('eventsm').insert({ message: msg.id, id: id, number: 0 }).run();         
        }     
    }
}