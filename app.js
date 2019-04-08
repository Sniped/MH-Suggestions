const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.config = require('./config.json');

client.login(client.config.token);
client.db = require('rethinkdbdash')({ db: 'suggestions' });
module.exports = client;

fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetchMessage(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

client.on('warn', e => {
  console.log('that was redacted');
});

client.on('error', e => {
  console.log('that was redacted');
});

client.elevation = msg => {
    let permlvl = 0;
    let council_role = msg.guild.roles.find(role => role.id === client.config.councilid);
    if (council_role && msg.member.roles.has(council_role.id)) permlvl = 3;
    let staff_role = msg.guild.roles.find(role => role.id === client.config.staffroleid);
    if (staff_role && msg.member.roles.has(staff_role.id)) permlvl = 4;
    if (msg.author.id === client.config.ownerid) permlvl = 5;
    return permlvl;
}

client.checkPerms = (msg, member) => {
    let punishable;
    let staff_role = msg.guild.roles.find(role => role.id === client.config.staffroleid);
    if (staff_role && member.roles.has(staff_role.id)) punishable = false;    
    return punishable; 
}