module.exports = {
    run: async (client, member) => {
        // we assume that the user is in db and probably is
        client.db.table('userData').get(member.id).delete().run();
    }
}