module.exports = {
    name: 'messageCreate',

    async execute(message) {
        const LEGIT_CHANNEL = '1450927031163424773'; // Twój kanał
        const HEART_EMOJI = '1470835571122376878'; // Twoje serduszko

        if (message.author.bot) return;

        if (message.channel.id !== LEGIT_CHANNEL) return;

        const content = message.content.toLowerCase();

        // Wiadomość musi ZACZYNAĆ SIĘ od +rep
        if (!content.startsWith('+rep')) return;

        try {
            await message.react(HEART_EMOJI);
        } catch (err) {
            console.error('Błąd przy dodawaniu reakcji:', err);
        }
    }
};
