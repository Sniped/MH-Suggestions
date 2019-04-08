module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: Invalid args! Valid arguments are `ban-msg`');
        if (args[0] == 'ban-msg') {
            if (!args[1]) return msg.channel.send(':x: You must provide a boolean for whether you want ban messages or not.');
            const userData = await client.db.table('userData').get(user.id).run();
            if (args[1] == 'true') {
                if (!userData.notifications.banmsg) {
                    client.db.table('userData').get(user.id).insert({ notifications: { banmsg: true } }).run();
                    msg.channel.send(':white_check_mark: Ban messages are now set to true!');
                } else {
                    client.db.table('userData').get(user.id).update({ notifications: { banmsg: true } }).run();
                    msg.channel.send(':white_check_mark: Ban messages are now set to true!');
                }
            } else if (args[1] == 'false') {
                if (!userData.notifications.banmsg) {
                    client.db.table('userData').get(user.id).insert({ notifications: { banmsg: false } }).run();
                    msg.channel.send(':white_check_mark: Ban messages are now set to false!');
                } else {
                    client.db.table('userData').get(user.id).update({ notifications: { banmsg: false } }).run();
                    msg.channel.send(':white_check_mark: Ban messages are now set to false!');
                }                
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