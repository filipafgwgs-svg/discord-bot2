const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-panel')
        .setDescription('Tworzy panel ticketów z menu wyboru')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#6A0DAD')
            .setTitle('🎫 VNV-SHOP × STWÓRZ TICKET')
            .setDescription(
                '**Masz problem, chcesz złożyć zamówienie lub masz jakieś pytania?**\n' +
                '━━━━━━━━━━━━━━━━━━━━\n' +
                '📩 × Aby utworzyć ticket wybierz odpowiednią kategorię!'
            )
            .setFooter({
                text: 'VNV-SHOP — System obsługi klienta',
            });

        const menu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('× Nie wybrano żadnej opcji')
            .addOptions(
                {
                    label: 'Zamówienia',
                    value: 'zamowienia',
                    description: 'Otwórz ticket dotyczący zamówienia'
                },
                {
                    label: 'Support',
                    value: 'support',
                    description: 'Uzyskaj pomoc techniczną'
                },
                {
                    label: 'Współpraca',
                    value: 'wspolpraca',
                    description: 'Nawiąż współpracę'
                },
                {
                    label: 'Problem z zamówieniem',
                    value: 'problem_zamowienie',
                    description: 'Zgłoś problem z zamówieniem'
                }
            );

        // ⭐ PRZYCISK 1 — Translate (tłumaczy cały panel)
        const translateButton = new ButtonBuilder()
            .setCustomId('translate_ticket')
            .setLabel('Translate')
            .setEmoji('🇬🇧')
            .setStyle(ButtonStyle.Secondary);

        // ⭐ PRZYCISK 2 — Translate Options (tłumaczy opcje select menu)
        const translateOptionsButton = new ButtonBuilder()
            .setCustomId('translate_ticket_options')
            .setLabel('Translate Options')
            .setEmoji('🇬🇧')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(menu);
        const row2 = new ActionRowBuilder().addComponents(translateButton, translateOptionsButton);

        await interaction.reply({
            embeds: [embed],
            components: [row, row2]
        });
    }
};
