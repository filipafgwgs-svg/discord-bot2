const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Wyświetla panel VNV-SHOP'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor('#ff4d6d')
            .setTitle('<:heart1:1470835571122376878> × VNV‑SHOP — CENNIK')
            .setDescription(
                '**W VNV‑SHOP oferujemy szeroki zakres usług:**\n' +
                'n1tr0, b00sty, social‑boostingi, streamingi, metody oraz wiele innych produktów.\n\n' +
                '**Każda kategoria została starannie przygotowana**, aby zapewnić Ci szybki dostęp do pełnej oferty i aktualnych cen.\n\n' +
                '**Przejrzyj dostępne sekcje poniżej i wybierz interesującą Cię kategorię.**\n' +
                'Pozwól, że przeprowadzimy Cię przez ofertę w sposób prosty, przejrzysty i profesjonalny.'
            );

        const menu = new StringSelectMenuBuilder()
            .setCustomId('shop_menu')
            .setPlaceholder('Wybierz kategorię…')
            .addOptions([
                {
                    label: 'Discord',
                    value: 'discord',
                    emoji: { id: '1470835571122376878', name: 'heart1' }
                },
                {
                    label: 'Social Boosting',
                    value: 'social',
                    emoji: { id: '1470835571122376878', name: 'heart1' }
                },
                {
                    label: 'VPN',
                    value: 'vpn',
                    emoji: { id: '1470835571122376878', name: 'heart1' }
                },
                {
                    label: 'League of Legends',
                    value: 'lol',
                    emoji: { id: '1470835571122376878', name: 'heart1' }
                },
                {
                    label: 'Streamingi',
                    value: 'streamingi',
                    emoji: { id: '1470835571122376878', name: 'heart1' }
                },
                {
                    label: 'Inne',
                    value: 'inne',
                    emoji: { id: '1470835571122376878', name: 'heart1' }
                },
                {
                    label: 'Metody / Dostawcy',
                    value: 'metody',
                    emoji: { id: '1470835571122376878', name: 'heart1' }
                }
            ]);

        // ⭐ PRZYCISK TRANSLATE
        const translateButton = new ButtonBuilder()
            .setCustomId('translate_shop')
            .setLabel('Translate')
            .setEmoji('🇬🇧')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(menu);
        const row2 = new ActionRowBuilder().addComponents(translateButton);

        await interaction.reply({ embeds: [embed], components: [row, row2] });
    }
};
