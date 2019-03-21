module.exports = {
    run: async (client, member) => {
        client.db.table('userData').insert({ id: member.id, banned: false, activity: 0 }).run();
    }
}