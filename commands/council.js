const Discord = require('discord.js');
const Table = require('cli-table2');
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
            const winnercheck = [];
            winners.forEach(w => {
                if (w.activity != 0) {
                    winnercheck.push(w.id);
                }
            });
            if (winnercheck.length == 0) return msg.channel.send(':x: Nobody is active on suggestions-meta! **NOTE**: Council members without the "Permanent Council" role have been removed from council.');
            winnercheck.forEach(w => {
                const user = client.guilds.get('546414872196415501').members.get(w);
                user.addRole('546420543713312800');
                user.send(`Congratulations! You were one of the top 5 most active users in suggestions-meta. Therefore, you have become a council member. If you would like to resign from your position, you can reply back to this message with \`no longer interested\`.`);
            });
            msg.guild.members.forEach(m => {
                client.db.table('userData').get(m.id).update({ activity: 0 }).run();
            });
            msg.channel.send(`:white_check_mark: The top ${winnercheck.length} people that have chatted in #suggestions-meta have been given council!`);
        } else if (args[0] == 'kick') {
            const user = msg.mentions.users.first();
            if (msg.mentions.users.size < 1) return msg.channel.send(':x: You must mention a council member!');
            const member = client.guilds.get('546414872196415501').members.get(user.id);
            if (client.checkPerms(msg, member) == false) return msg.channel.send(':x: User cannot be kicked.')
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
            if (client.checkPerms(msg, member) == false) return msg.channel.send(':x: User cannot be banned.');
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
            function grammercheck1() {
                let check;
                if (bannedu.length == 1) {
                    check = 'is';
                } else check = 'are';
                return check;
            }
            msg.channel.send(`Now showing the ${bannedu.length} ${grammercheck()} that ${grammercheck1()} banned from the council\n\n${banlist}`);
        } else if (args[0] == 'inf') {
            if (!args[1]) return msg.channel.send(':x: Invalid argument! Valid arguments are `search` and `list`');
            if (args[1] == 'search') {
                if (!args[2]) return msg.channel.send(':x: You must include an ID.');
                if (Number(args[2]) == NaN) return msg.channel.send(':x: Your ID must be a number.');
                const id = parseInt(args[2], 10);
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
                function getReason(data) {
                    let reason;
                    if (data.type == 'UNBAN') {
                        reason = 'None'
                    } else reason = data.reason;
                    return reason;
                }
                const embed = new Discord.RichEmbed()
                .setTitle(`Showing data for ${data.type} ${data.id}`)
                .setDescription(`**ID**: ${data.id}\n\n**Punished**: ${data.user.name}\n\n**Punished By:** ${data.author.name}\n\n**Active:** ${data.active}\n\n**Date Punished**: ${data.date}\n\n**Reason**: ${getReason(data)}`)
                .setThumbnail(data.user.avatarURL)
                .setColor(getColor(data));
                msg.channel.send(embed);
            } else if (args[1] == 'list') {
                if (msg.mentions.users.size > 1) return msg.channel.send(':x: You must mention someone to list their infractions.');
                const user = msg.mentions.users.first();
                if (!user) return msg.channel.send(':x: Invalid user!');
                const userinf = await client.db.table('punishments').filter({ user: { id: user.id } }).orderBy(client.db.desc('date')).run();
                if (userinf.length == 0) return msg.channel.send(':x: This user doesn\'t have any infractions!');
                const inftable = new Table({
                     head: [ 'ID', 'User', 'Moderator', 'Date', 'Type', 'Active', 'Reason' ],
                     chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
                     , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
                     , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
                     , 'right': '' , 'right-mid': '' , 'middle': ' ' },
                });
                userinf.forEach(inf => {
                    inftable.push([ inf.id, inf.user.name, inf.author.name, inf.date.toString(), inf.type, inf.active, inf.reason ]);
                });
                msg.channel.send(`\`\`\`${inftable.toString()}\`\`\``);
            } else return msg.channel.send(':x: Invalid argument! Valid arguments are `search` and `list`');
        } else return msg.channel.send(':x: Invalid arguments! Valid arguments are `reset`, `kick`, `ban`, `unban`, `banlist`, and `inf`.');
    },
    meta: {
        aliases: ['council'],
        description: 'Manage the council team.',
        permlvl: 4,
        usage: ''        
    }
}