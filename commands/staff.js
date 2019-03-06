module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: Invalid arguments! Valid arguments are `reset`, `kick`, `ban`, and `unban`.');
        if (args[0] == 'reset') {
            // firstly we must remove all current members
            const guild = client.guilds.get('546414872196415501');
            const members = guild.members;
            members.forEach(member => {
                const council_role = guild.roles.find(role => role.id === client.config.councilid);
                if (member.roles.has(council_role.id)) {
                    member.removeRole(client.config.councilid);
                }
            });
            // then we must give 5 new people council using the reaction
            client.channels.get('546800461387399184').fetchMessage('548244848856268810').then(cmsg => {
                    cmsg.reactions.get('👍').fetchUsers().then(u => {
                        const ids = []
                        u.forEach(u => {
                            if (!u.bot) {
                                ids.push(u.id);
                            }
                        });
                        if (ids.length < 5) return msg.channel.send(':x: There are not enough people to reset the council team! **Anyone on the council team before has been removed.**');
                        const getWinners = function(candidates) {
                            let newPos,
                                temp;
    
                            for (let i = candidates.length -1; i > 0; i--) {
                                newPos = Math.floor(Math.random() * (i + 1));
                                temp = candidates[i];
                                candidates[i] = candidates[newPos];
                                candidates[newPos] = temp;
                            }
                            return candidates;
                        }
                        const randomwinners = getWinners(ids);
                        const winners = [ randomwinners[0], randomwinners[1], randomwinners[2], randomwinners[3], randomwinners[4] ]
                        const fail2send = []
                        // since winners has been given 5 ids, let's go through them
                        winners.forEach(function(winners) {
                            const user = client.guilds.get('546414872196415501').members.get(winners);
                            user.addRole(client.config.councilid);
                            try {
                                user.send('Congratulations! You have been selected to join the Minehut Suggestions council team and review suggestions! If you\'re not interested in joining the team, or if you\'d like to resign, you can at any time reply with `No longer interested` and get your rank taken away.');
                            } catch (err) {
                                fail2send.push(u.id);
                            }
                        });
                        if (fail2send.length != 0) return msg.channel.send(`Couldn't DM the following users **${fail2send.join(' ,')}.`);
                        // now it's time to remove the reactions from the message
                        u.forEach(u => {
                            if (!u.bot) {
                               cmsg.reactions.get('👍').remove(u);
                            }
                        });
                        msg.channel.send(':white_check_mark: Successfully reset the entire player council!');                          
                     });
            });
        } else if (args[0] == 'kick') {
            const user = msg.mentions.users.first();
            if (msg.mentions.users.size < 1) return msg.channel.send(':x: You must mention a council member!');
            const member = client.guilds.get('546414872196415501').members.get(user.id);
            const council_role = msg.guild.roles.get(client.config.councilid);
            if (!member.roles.has(council_role.id)) return msg.channel.send(':x: The user doesn\'t have council!');
            const reason = args.slice(2).join(' ');
            if (!reason) return msg.channel.send(':x: You must include a reason for kicking this user!');
            const numData = await client.db.table('nData').get('punishments').run()
            const id = numData.number;
            const num2insert = numData.number+1;
            client.db.table('punishments').insert({ id: id, user: { name: user.username, id: user.id, avatarURL: user.avatarURL }, author: { name: msg.author.username, id: msg.author.id }, type: 'KICK', date: new Date(), active: false, reason: reason }).run();
            client.db.table('nData').get('punishments').update({ number: num2insert }).run();
            member.removeRole(council_role.id);
            msg.channel.send(`:white_check_mark: Successfully kicked **${user.username}** for **${reason}**. The ID for this infraction is **${id}**.`);
        } else if (args[0] == 'ban') { 
            const user = msg.mentions.users.first();
            if (msg.mentions.users.size < 1) return msg.channel.send(':x: You must mention someone to ban from the council!');
            const member = msg.guild.members.get(user.id);
            const council_role = msg.guild.roles.get(client.config.councilid);
            const reason = args.slice(2).join(' ');
            if (!reason) return msg.channel.send(':x: You must include a reason for banning this user!');
            const uData = await client.db.table('userData').get(user.id).run();
            if (uData.banned == true) return msg.channel.send(':x: This user is already banned!');
            const numData = await client.db.table('nData').get('punishments').run();
            const id = numData.number;
            const num2insert = numData.number+1;
            if (member.roles.has(council_role.id)) member.removeRole(council_role.id);
            client.channels.get('546800461387399184').fetchMessage('548244848856268810').then(cmsg => {
                cmsg.reactions.get('👍').fetchUsers().then(u => {
                    const ids = [];
                    u.forEach(u => {
                        ids.push(u.id);
                    });
                    if (ids.includes(user.id)) {
                        cmsg.reactions.get('👍').remove(user);
                    }
                });
            });
            client.db.table('punishments').insert({ id: id, user: { name: user.username, id: user.id, avatarURL: user.avatarURL }, author: { name: msg.author.username, id: msg.author.id }, type: 'BAN', date: new Date(), active: true, reason: reason }).run();
            client.db.table('nData').get('punishments').update({ number: num2insert }).run();
            client.db.table('userData').get(user.id).update({ banned: true }).run();
            msg.channel.send(`:white_check_mark: Successfully banned **${user.username}** from the council team for **${reason}**. The ID for this infraction is **${id}**.`);
        } else if (args[0] == 'unban') {
            const user = msg.mentions.users.first();
            if (msg.mentions.users.size < 1) return msg.channel.send(':x: You must mention someone who is banned from the council!');
            const data = await client.db.table('userData').get(user.id).run();
            if (data.banned == false) return msg.channel.send(':x: The user you mentioned isn\'t banned.');            
            const numData = await client.db.table('nData').get('punishments').run();
            const id = numData.number;
            const num2insert = numData.number+1;
            const pun = await client.db.table('punishments').filter({ user: { id: user.id }, active: true }).run();
            const ids = []; // this should only get one
            pun.forEach(p => {
                ids.push(p.id)
            });
            client.db.table('punishments').get(ids[0]).update({ active: false }).run();
            client.db.table('punishments').insert({ id: id, user: { name: user.username, id: user.id, avatarURL: user.avatarURL }, author: { name: msg.author.username, id: msg.author.id }, type: 'UNBAN', date: new Date(), active: false }).run();
            client.db.table('nData').get('punishments').update({ number: num2insert }).run();
            client.db.table('userData').get(user.id).update({ banned: false }).run();
            msg.channel.send(`:white_check_mark: Successfully unbanned **${user.username}** from the council team. The ID for this infraction is **${id}**.`);
        } else return msg.channel.send(':x: Invalid arguments! Valid arguments are `reset`, `kick`, `ban`, and `unban`.');
    },
    meta: {
        aliases: ['staff'],
        description: 'Manage the staff team.',
        permlvl: 4,
        usage: ''        
    }
}