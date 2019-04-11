const fs = require('fs');
const Discord = require('discord.js');
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
            client.db.table('features').insert({ id: id, message: msg.id, upvotes: 0, downvotes: 0 }).run();
        } else if (msg.channel.id == client.config.discordchannel && msg.author.id != client.user.id) {
            msg.react(client.emojis.get('546435721444196353')).then(msg.react(client.emojis.get('546435753719103488')));
            const nData = await client.db.table('nData').get('discord').run();
            const id = nData.number
            const num2insert = nData.number+1
            client.db.table('nData').get('discord').update({ number: num2insert }).run();
            client.db.table('discord').insert({ id: id, message: msg.id, upvotes: 0, downvotes: 0 }).run();
        } else if (msg.channel.id == client.config.eventchannel && msg.author.id != client.user.id) {
            msg.react(client.emojis.get('546435721444196353')).then(msg.react(client.emojis.get('546435753719103488')));
            const nData = await client.db.table('nData').get('events').run();
            const id = nData.number
            const num2insert = nData.number+1
            client.db.table('nData').get('events').update({ number: num2insert }).run();
            client.db.table('events').insert({ id: id, message: msg.id, upvotes: 0, downvotes: 0 }).run();
        } else if (!msg.guild) {
            if (msg.content.toLowerCase() == 'no longer interested') {
                const council_role = client.guilds.get('546414872196415501').roles.find(role => role.id === client.config.councilid);
                // we need to call the message author a member of the MH Suggestions guild
                const member = client.guilds.get('546414872196415501').members.get(msg.author.id);
                if (!member.roles.has(council_role.id)) return msg.channel.send(':x: You\'re not apart of the council!');
                member.removeRole(council_role.id);
                client.channels.get('551789090916532224').send(`:warning: <@${member.id}> has resigned from the council team.`);
                msg.channel.send(':white_check_mark: You have successfully resigned from the council team!'); 
            }
        } else if (msg.channel.id == '551915746503163911') {
            const user = await client.db.table('userData').get(msg.author.id).run();
            const member = msg.guild.members.get(msg.author.id);
            if (!member.roles.has('546420543713312800') && !member.roles.has('546415221212839947') && !msg.author.bot && !user.banned) {
                const newact = user.activity + 1
                client.db.table('userData').get(msg.author.id).update({ activity: newact }).run();
            } else if (user.banned) {
                const punishments = await client.db.table('punishments').filter({ user: { id: user.id }, type: 'BAN', active: true }).run();
                const p = punishments[0];
                if (!user.notifications.banmsg || user.notifications.banmsg != false) {
                    const embed = new Discord.RichEmbed()
                    .setDescription('You are permanently banned from the Player Council!')
                    .addField('ID', p.id, true)
                    .addField('Moderator', p.author.name, true)
                    .addField('Reason', p.reason, true)
                    .addField('Punished', p.date.toString())
                    .setColor('#FF0000')
                    .setFooter(`To stop this message from appearing, simply execute the command '!settings ban-msg false' in the MH Suggestions discord.`);
                    const u = client.users.get(user.id);
                    u.send(embed);        
                } else return;
            } else return;
        }      
    }
}