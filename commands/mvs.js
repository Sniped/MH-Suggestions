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
        if (!args[0]) return msg.channel.send(':x: Invalid arguments! Valid arguments are `discord`, `events`, `features`, and `plugins`.');
        if (args[0] == 'discord') {
            const discordsuggestions = await client.db.table('discord').orderBy(client.db.desc('number')).limit(10).run()
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
        } else if (args[0] == 'events') {
            const eventsuggestions = await client.db.table('events').orderBy(client.db.desc('number')).limit(10).run()
            var count = 0;
            let suggmsg = []
            eventsuggestions.forEach(suggestion => {
                count++;
                suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.number}`);
            });
            if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
            const embed = new Discord.RichEmbed()
            embed.setTitle('Showing the top 10 suggestions for the Events category')
            embed.setColor('#388E8E');
            embed.setDescription(suggmsg.join('\n\n'));
            msg.channel.send(embed);            
        } else if (args[0] == 'features') {
            const featuresuggestions = await client.db.table('features').orderBy(client.db.desc('number')).limit(10).run()
            var count = 0;
            let suggmsg = []
            featuresuggestions.forEach(suggestion => {
                count++;
                suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.number}`);
            });
            if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
            const embed = new Discord.RichEmbed()
            embed.setTitle('Showing the top 10 suggestions for the Features category')
            embed.setColor('#388E8E');
            embed.setDescription(suggmsg.join('\n\n'));
            msg.channel.send(embed);            
        } else if (args[0] == 'plugins') {
            const pluginsuggestions = await client.db.table('plugins').orderBy(client.db.desc('number')).limit(10).run()
            var count = 0;
            let suggmsg = []
            pluginsuggestions.forEach(suggestion => {
                count++;
                suggmsg.push(`${getEmoji(count)} **ID**: ${suggestion.id} | **Upvotes**: ${suggestion.number}`);
            });
            if (suggmsg.length == 0) return msg.channel.send(':x: There are no suggestions for this category!');
            const embed = new Discord.RichEmbed()
            embed.setTitle('Showing the top 10 suggestions for the Plugins category')
            embed.setColor('#388E8E');
            embed.setDescription(suggmsg.join('\n\n'));
            msg.channel.send(embed);            
        } else return msg.channel.send(':x: Invalid arguments! Valid arguments are `discord`, `events`, `features`, and `plugins`.')
    },
    meta: {
        aliases: ['mvs'],
        description: 'Look up the most voted suggestions in a category.',
        permlvl: 4,
        usage: ''
    }      
}