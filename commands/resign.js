module.exports = {
    run: async (client, msg, args) => {
        if (msg.guild) return msg.channel.send(':x: This must be in a DM!');
        const council_role = msg.guild.roles.find(role => role.id === client.config.councilid);
        // we need to call the message author a member of the MH Suggestions guild
        const member = client.guilds.get('546414872196415501').members.get(msg.author.id);
        if (!member.roles.has(council_role.id)) return msg.channel.send(':x: You\'re not apart of the council!');
        member.removeRole(council_role.id);
        msg.channel.send(':white_check_mark: You have successfully resigned from the council team!');        
    }
}