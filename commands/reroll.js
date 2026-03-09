const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

// Importujemy pamięć giveawayów z giveaway.js
const { giveaways } = require('./giveaway');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reroll')
        .setDescription('Losuje nowego zwycięzcę giveaway’a')
        .addStringOption(option =>
            option.setName('message_id')
                .setDescription('ID wiadomości giveaway’a')
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const messageId = interaction.options.getString('message_id');

        const data = giveaways.get(messageId);
        if (!data) {
            return interaction.reply({
                content: '❌ Nie znaleziono giveaway’a o tym ID.',
                ephemeral: true
            });
        }

        const usersArray = Array.from(data.users);

        if (usersArray.length === 0) {
            return interaction.reply({
                content: '❌ Nie można zrobić rerolla — brak uczestników.',
                ephemeral: true
            });
        }

        // losujemy nowego zwycięzcę
        const winner = usersArray[Math.floor(Math.random() * usersArray.length)];

        const embed = new EmbedBuilder()
            .setTitle('🎉 Nowy zwycięzca konkursu! 🎉')
            .setColor('#9b59b6')
            .addFields(
                { name: '🏆 Nagroda', value: data.nagroda },
                { name: '👑 Nowy zwycięzca', value: `<@${winner}>` },
                { name: '👥 Uczestnicy', value: `${usersArray.length}` }
            );

        await interaction.reply({
            content: `🎉 Gratulacje <@${winner}>!`,
            embeds: [embed]
        });
    }
};
