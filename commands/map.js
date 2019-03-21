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
            }
            return number;            
        }
        const mostactivepeople = await client.db.table('userData').orderBy(client.db.desc('activity')).limit(5).run();
        var count = 0;
        let activemsg = [];
        mostactivepeople.forEach(map => {
            count++;
            const user = client.users.get(map.id);
            activemsg.push(`${getEmoji(count)} **ID**: ${user.tag} | **Messages**: ${map.activity}`);
        });
        const embed = new Discord.RichEmbed()
        embed.setTitle('Showing the top 5 most active people in suggestions-meta')
        embed.setColor('#388E8E')
        embed.setDescription(activemsg.join('\n\n'));
        msg.channel.send(embed);
    },
    meta: {
        aliases: ['map'],
        description: 'Gets the most active people of suggestions meta.',
        permlvl: 0,
        usage: ''
    }
}