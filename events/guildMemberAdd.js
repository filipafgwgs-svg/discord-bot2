module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {
        const UNVERIFIED_ROLE_ID = '1450927027665502385';

        try {
            await member.roles.add(UNVERIFIED_ROLE_ID);
            console.log(`Dodano rolę Niezwerfikowany dla ${member.user.tag}`);
        } catch (err) {
            console.error('Błąd przy nadawaniu roli:', err);
        }
    }
};
