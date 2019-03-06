const Discord = require('discord.js');
module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: Invalid arguments! Valid arguments are `feature`, `discord`, `event` and `plugin`.');
        if (args[0] == 'feature') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID.');
            if (Number(args[1]) == NaN) return msg.channel.send(':x: Your ID must be a number.');
            const id = parseInt(args[1], 10);
            const data = await client.db.table('features').get(id).run();
            if (!data) return msg.channel.send(':x: Invalid ID! Maybe you looked up the wrong category?');
            const channel = client.channels.get(client.config.featurechannel)
            channel.fetchMessage(data.message).then(m => {
                const embed = new Discord.RichEmbed()
                .setTitle(`Showing data for ${args[0]} suggestion ${data.id}`)
                .setDescription(`**ID**: ${data.id}\n\n**Author**: ${m.author.username}\n\n**Suggestion**: ${m.content}\n\n**Upvotes**: ${data.number}`)
                .setThumbnail(m.author.avatarURL)
                .setColor('#388E8E');
                msg.channel.send(embed);
            });     
        } else if (args[0] == 'discord') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID.');
            if (Number(args[1]) == NaN) return msg.channel.send(':x: Your ID must be a number.');
            const id = parseInt(args[1], 10);
            const data = await client.db.table('discord').get(id).run();
            if (!data) return msg.channel.send(':x: Invalid ID! Maybe you looked up the wrong category?');
            const channel = client.channels.get(client.config.discordchannel);
            channel.fetchMessage(data.message).then(m => {
                const embed = new Discord.RichEmbed()
                .setTitle(`Showing data for ${args[0]} suggestion ${data.id}`)
                .setDescription(`**ID**: ${data.id}\n\n**Author**: ${m.author.username}\n\n**Suggestion**: ${m.content}\n\n**Upvotes**: ${data.number}`)
                .setThumbnail(m.author.avatarURL)
                .setColor('#388E8E');
                msg.channel.send(embed);
            });    
        } else if (args[0] == 'event') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID.');
            if (Number(args[1]) == NaN) return msg.channel.send(':x: Your ID must be a number.');
            const id = parseInt(args[1], 10);
            const data = await client.db.table('events').get(id).run();
            if (!data) return msg.channel.send(':x: Invalid ID! Maybe you looked up the wrong category?');
            const channel = client.channels.get(client.config.eventchannel);
            channel.fetchMessage(data.message).then(m => {
                const embed = new Discord.RichEmbed()
                .setTitle(`Showing data for ${args[0]} suggestion ${data.id}`)
                .setDescription(`**ID**: ${data.id}\n\n**Author**: ${m.author.username}\n\n**Suggestion**: ${m.content}\n\n**Upvotes**: ${data.number}`)
                .setThumbnail(m.author.avatarURL)
                .setColor('#388E8E');
                msg.channel.send(embed);
            });   
        } else if (args[0] == 'plugin') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID.');
            if (Number(args[1]) == NaN) return msg.channel.send(':x: Your ID must be a number.');
            const id = parseInt(args[1], 10);
            const data = await client.db.table('plugins').get(id).run();
            if (!data) return msg.channel.send(':x: Invalid ID! Maybe you looked up the wrong category?');
            const channel = client.channels.get(client.config.pluginchannel);
            channel.fetchMessage(data.message).then(m => {
                const embed = new Discord.RichEmbed()
                .setTitle(`Showing data for ${args[0]} suggestion ${data.id}`)
                .setDescription(`**ID**: ${data.id}\n\n**Author**: ${m.author.username}\n\n**Suggestion**: ${m.content}\n\n**Upvotes**: ${data.number}`)
                .setThumbnail(m.author.avatarURL)
                .setColor('#388E8E');
                msg.channel.send(embed);
            });   
        } else if (args[0] == 'punishment') {
            if (!args[1]) return msg.channel.send(':x: You must include an ID.');
            if (Number(args[1]) == NaN) return msg.channel.send(':x: Your ID must be a number.');
            const id = parseInt(args[1], 10);
            const data = await client.db.table('punishments').get(id).run();
            if (!data) return msg.channel.send(':x: Invalid ID! Maybe you looked up the wrong category?');
            function getColor(data) {
                let color;
                if (data.active == false) {
                    color = '#32CD32'
                } else if (data.active == true) {
                    color = '#FF0000'
                }
                return color;
            }
            const embed = new Discord.RichEmbed()
            .setTitle(`Showing data for ${data.type} ${data.id}`)
            .setDescription(`**ID**: ${data.id}\n\n**Punished**: ${data.user.name}\n\n**Punished By:** ${data.author.name}\n\n**Active:** ${data.active}\n\n**Date Punished**: ${data.date}\n\n**Reason**: ${data.reason}`)
            .setThumbnail(data.user.avatarURL)
            .setColor(getColor(data));
            msg.channel.send(embed);
        } else return msg.channel.send(':x: Invalid arguments! Valid arguments are `feature`, `discord`, `event` and `plugin`.')    
    },
    meta: {
        aliases: ['lookup'],
        description: 'Look up a certain suggestion by its ID.',
        permlvl: 0,
        usage: ''        
    }
}