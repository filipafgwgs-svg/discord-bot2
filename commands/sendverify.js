const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendverify')
        .setDescription('Wysyła panel weryfikacji'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle('🔐 Weryfikacja')
            .setDescription('Kliknij przycisk poniżej, aby rozpocząć weryfikację.')
            .setColor('#6A0DAD');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('verify_btn')
                .setLabel('Zweryfikuj się')
                .setStyle(ButtonStyle.Success)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
