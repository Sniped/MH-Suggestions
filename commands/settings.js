module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: Invalid args! Valid arguments are `ban-msg`');
        if (args[0] == 'ban-msg') {
            if (!args[1]) return msg.channel.send(':x: You must provide a boolean for whether you want ban messages or not.');
            const userData = await client.db.table('userData').get(msg.author.id).run();
            if (userData.notifications.banmsg == true) {
                client.db.table('userData').get(msg.author.id).update({ notifications: { banmsg: false } }).run();
                msg.channel.send(':white_check_mark: Set ban message notifications to false.');
            } else if (userData.notifications.banmsg == false) {
                client.db.table('userData').get(msg.author.id).update({ notifications: { banmsg: true } }).run();
                msg.channel.send(':white_check_mark: Set ban message notifications to true.');                
            }
        } else return msg.channel.send(':x: Invalid args! Valid arguments are `ban-msg`');
    },
    meta: {
        aliases: ['settings'],
        description: 'Manage certain preferences',
        permlvl: 0,
        usage: ''
    }        
}