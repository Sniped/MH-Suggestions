module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: Invalid arguments! Valid arguments are `reset`, `kick`, `ban`, `unban`, and `banlist`.');
        if (args[0] == 'reset') {
            msg.guild.members.forEach(m => {
                if (m.roles.has('546420543713312800') && !m.roles.has('556967344459481108')) {
                    m.removeRole('546420543713312800');
                }
            });
            const winners = await client.db.table('userData').orderBy(client.db.desc('activity')).limit(5).run();
            winners.forEach(w => {
                const user = client.guilds.get('5464148721964155011').members.get(w.id);
                user.addRole('546420543713312800');
            });
            msg.guild.members.forEach(m => {
                client.db.table('userData').get(m.id).update({ activity: 0 }).run();
            });
            msg.channel.send(`:white_check_mark: The top ${winners.length} people that have chatted in #suggestions-meta have been given council!`);
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
            client.db.table('userData').get(user.id).update({ activity: 0 }).run();
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
        } else if (args[0] == 'banlist') {
            const banned = await client.db.table('userData').filter({ banned: true }).run();
            if (banned.length == 0) return msg.channel.send(':x: Nobody is banned!');
            const bannedu = [];
            banned.forEach(b => {
                const u = client.users.get(b.id);
                bannedu.push(u.tag);
            });
            const banlist = `\`\`\`${bannedu.join(', ')}\`\`\``
            function grammercheck() {
                let check;
                if (bannedu.length == 1) {
                    check = 'user';
                } else check = 'users';
                return check;
            }
            msg.channel.send(`Now showing the ${bannedu.length} ${grammercheck()} that are banned from the council\n\n${banlist}`);
        } else return msg.channel.send(':x: Invalid arguments! Valid arguments are `reset`, `kick`, `ban`, `unban`, and `banlist`.');
    },
    meta: {
        aliases: ['council'],
        description: 'Manage the council team.',
        permlvl: 4,
        usage: ''        
    }
}