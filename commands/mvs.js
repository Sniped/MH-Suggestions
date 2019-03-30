const Discord = require('discord.js');
module.exports = {
    run: async (client, msg, args) => {
        function getEmoji(number) {
            if (number == 1) {
                return ':one:'
            } else if (number == 2) {
                return ':two:'
            } else if (number == 3) {
                return ':three:'
            } else if (number == 4) {
                return ':four:'
            } else if (number == 5) {
                return ':five:'
            } else if (number == 6) {
                return ':six:'
            } else if (number == 7) {
                return ':seven:'
            } else if (number == 8) {
                return ':eight:'
            } else if (number == 9) {
                return ':nine:'
            } else if (number == 10) {
                return ':keycap_ten:'
            } else return ':question:'
        }
        if (!args[0]) return msg.channel.send(':x: Invalid arguments! Valid arguments are `discord`, `events`, and `features`.');
        if (args[0] == 'discord') {
            if (args[1] == '-a') {
                const discordsuggestions = await client.db.table('discorda').orderBy(client.db.desc('number')).limit(10).run();
                var count = 0;
                let suggmsg = []
                discordsuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.number}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);
            } else if (args[1] == '-d') {
                const discordsuggestions = await client.db.table('discord').orderBy(client.db.desc('downvotes')).limit(10).run();
                var count = 0;
                let suggmsg = []
                discordsuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.upvotes} | **Downvotes**: ${suggestion.downvotes}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);                
            } else {
                const discordsuggestions = await client.db.table('discord').orderBy(client.db.desc('upvotes')).limit(10).run();
                var count = 0;
                let suggmsg = []
                discordsuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.upvotes} | **Downvotes**: ${suggestion.downvotes}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);                
            }
        } else if (args[0] == 'events') {
            if (args[1] == '-a') {
                const eventsuggestions = await client.db.table('eventsa').orderBy(client.db.desc('number')).limit(10).run();
                var count = 0;
                let suggmsg = []
                eventsuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.number}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);
            } else if (args[1] == '-d') {
                const eventsuggestions = await client.db.table('events').orderBy(client.db.desc('downvotes')).limit(10).run();
                var count = 0;
                let suggmsg = []
                eventsuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.upvotes} | **Downvotes**: ${suggestion.downvotes}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);                
            } else {
                const featuresuggestions = await client.db.table('features').orderBy(client.db.desc('upvotes')).limit(10).run();
                var count = 0;
                let suggmsg = []
                featuresuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.upvotes} | **Downvotes**: ${suggestion.downvotes}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);                
            }
        } else if (args[0] == 'features') {
            if (args[1] == '-a') {
                const featuresuggestions = await client.db.table('featuresa').orderBy(client.db.desc('number')).limit(10).run();
                var count = 0;
                let suggmsg = []
                featuresuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.upvotes} | **Downvotes**: ${suggestion.downvotes}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);
            } else if (args[1] == '-d') {
                const featuresuggestions = await client.db.table('features').orderBy(client.db.desc('downvotes')).limit(10).run();
                var count = 0;
                let suggmsg = []
                featuresuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.upvotes} | **Downvotes**: ${suggestion.downvotes}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);                
            } else {
                const featuresuggestions = await client.db.table('features').orderBy(client.db.desc('upvotes')).limit(10).run();
                var count = 0;
                let suggmsg = []
                featuresuggestions.forEach(suggestion => {
                    count++;
                    suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.upvotes} | **Downvotes**: ${suggestion.downvotes}`);
                });
                if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
                const embed = new Discord.RichEmbed()
                embed.setTitle('Showing the top 10 suggestions for the Discord category')
                embed.setColor('#388E8E');
                embed.setDescription(suggmsg.join('\n\n'));
                msg.channel.send(embed);                
            }
        } else return msg.channel.send(':x: Invalid arguments! Valid arguments are `discord`, `events`, and `features`.')
    },
    meta: {
        aliases: ['mvs'],
        description: 'Look up the most voted suggestions in a category.',
        permlvl: 4,
        usage: ''
    }      
}