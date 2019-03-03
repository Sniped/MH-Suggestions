module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send(':x: Invalid arguments! Valid arguments are `reset`.');
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
                        // since winners has been given 5 ids, let's go through them
                        winners.forEach(function(winners) {
                            const user = client.guilds.get('546414872196415501').members.get(winners);
                            user.addRole(client.config.councilid);
                            user.send('Congratulations! You have been selected to join the Minehut Suggestions council team and review suggestions! If you\'re not interested in joining the team, or if you\'d like to resign, you can at any time reply with `No longer interested` and get your rank taken away.');
                        });
                        // now it's time to remove the reactions from the message
                        u.forEach(u => {
                            if (!u.bot) {
                               cmsg.reactions.get('👍').remove(u);
                            }
                        });
                        msg.channel.send(':white_check_mark: Successfully reset the entire player council!');                          
                     });
            });
        } else return msg.channel.send(':x: Invalid arguments! Valid arguments are `reset`.');
    },
    meta: {
        aliases: ['staff'],
        description: 'Manage the staff team.',
        permlvl: 4,
        usage: ''        
    }
}