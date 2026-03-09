const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require('discord.js');

// Twoje role
const VERIFIED_ROLE_ID = '1450927027665502387';
const UNVERIFIED_ROLE_ID = '1450927027665502385';

// Funkcja generująca kod captcha
function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        // -------------------------------
        // PRZYCISK — START WERYFIKACJI
        // -------------------------------
        if (interaction.isButton() && interaction.customId === 'verify_btn') {

            const code = generateCode();

            client.captcha = client.captcha || {};
            client.captcha[interaction.user.id] = code;

            const embed = new EmbedBuilder()
                .setTitle('🔐 Weryfikacja — przepisz kod')
                .setDescription(`Twój kod weryfikacyjny:\n\n**${code}**\n\nKliknij przycisk poniżej, aby wpisać kod.`)
                .setColor('#6A0DAD');

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('captcha_modal')
                    .setLabel('Wpisz kod')
                    .setStyle(ButtonStyle.Primary)
            );

            return interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        }

        // -------------------------------
        // OTWARCIE MODALA
        // -------------------------------
        if (interaction.isButton() && interaction.customId === 'captcha_modal') {

            const modal = new ModalBuilder()
                .setCustomId('captcha_submit')
                .setTitle('Wpisz kod z captcha');

            const input = new TextInputBuilder()
                .setCustomId('captcha_input')
                .setLabel('Kod z ekranu')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            modal.addComponents(new ActionRowBuilder().addComponents(input));

            return interaction.showModal(modal);
        }

        // -------------------------------
        // SPRAWDZENIE KODU
        // -------------------------------
        if (interaction.isModalSubmit() && interaction.customId === 'captcha_submit') {

            const userInput = interaction.fields.getTextInputValue('captcha_input');
            const correct = client.captcha?.[interaction.user.id];

            if (!correct) {
                return interaction.reply({
                    content: '❌ Wystąpił błąd — spróbuj ponownie.',
                    ephemeral: true
                });
            }

            if (userInput.toUpperCase() !== correct.toUpperCase()) {
                return interaction.reply({
                    content: '❌ Zły kod! Spróbuj ponownie.',
                    ephemeral: true
                });
            }

            delete client.captcha[interaction.user.id];

            await interaction.member.roles.add(VERIFIED_ROLE_ID);
            await interaction.member.roles.remove(UNVERIFIED_ROLE_ID);

            return interaction.reply({
                content: '✅ Zweryfikowano pomyślnie! Witamy na serwerze.',
                ephemeral: true
            });
        }
    }
};
