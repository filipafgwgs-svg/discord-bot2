const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reklama')
        .setDescription('Wysyła reklamę na kanał partnerski.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const CHANNEL_ID = '1450927032182509803';

        const channel = interaction.guild.channels.cache.get(CHANNEL_ID);
        if (!channel) {
            return interaction.reply({
                content: '❌ Nie znaleziono kanału do wysłania reklamy.',
                ephemeral: true
            });
        }

        const tekst = `
Chcesz mieć dostęp do niezawodnych produktów i wyjątkowych ofert? 
Dołącz do naszego discorda już teraz!

Oferujemy:

➼ Tanie niezawodne d1sc0rd n1tro.
➼ Niskie ceny b00stów.
➼ Możliwość podboostowania sobie sociali.
➼ Legalne i sprawdzone sposoby na zakupy online.
➼ Szybkie bezproblemowe zakupy.

Dołącz do naszej Discorda już dziś i odkryj niezawodne produkty i najlepsze oferty, 
które pozwolą Ci zaoszczędzić pieniądze i cieszyć się zakupami online!
https://discord.gg/9y3XuZzC33
        `;

        await channel.send(tekst);

        return interaction.reply({
            content: '✅ Reklama została wysłana!',
            ephemeral: true
        });
    }
};
