const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const giveaways = new Map();

// Formatowanie czasu (ładne)
function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    let parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(' ');
}

// Parsowanie czasu
function parseTime(input) {
    const match = input.match(/^(\d+)(s|m|h|d)$/);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        default: return null;
    }
}

module.exports = {
    giveaways,

    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Tworzy giveaway z przyciskiem')
        .addStringOption(option =>
            option.setName('czas')
                .setDescription('Czas trwania (np. 10s, 5m, 1h, 2d)')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('zwyciezcy')
                .setDescription('Liczba zwycięzców')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('nagroda')
                .setDescription('Nagroda w giveaway’u')
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const czasInput = interaction.options.getString('czas');
        const zwyciezcy = interaction.options.getInteger('zwyciezcy');
        const nagroda = interaction.options.getString('nagroda');

        const duration = parseTime(czasInput);
        if (!duration) {
            return interaction.reply({
                content: '❌ Nieprawidłowy format czasu! Użyj np. `10s`, `5m`, `1h`, `2d`.',
                ephemeral: true
            });
        }

        const endTimestamp = Date.now() + duration;

        const embed = new EmbedBuilder()
            .setTitle('🎉 KONKURS × VNV-SHOP 🎉')
            .setColor('#9b59b6')
            .addFields(
                { name: '🏆 Nagroda', value: nagroda },
                { name: '⏰ Pozostały czas', value: formatTime(duration), inline: true },
                { name: '👑 Zwycięzców', value: `${zwyciezcy}`, inline: true },
                { name: '👥 Uczestnicy', value: '0', inline: true },
            )
            .setFooter({ text: 'Kliknij przycisk poniżej, aby wziąć udział!' });

        const button = new ButtonBuilder()
            .setCustomId('join_giveaway')
            .setLabel('Weź udział 🎉')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        const message = await interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply: true
        });

        giveaways.set(message.id, {
            users: new Set(),
            zwyciezcy,
            nagroda,
            channelId: message.channel.id,
            messageId: message.id,
            endTimestamp
        });

        // ====== ODLICZANIE ======
        const interval = setInterval(async () => {
            const data = giveaways.get(message.id);
            if (!data) return clearInterval(interval);

            const remaining = data.endTimestamp - Date.now();
            if (remaining <= 0) return;

            const updatedEmbed = EmbedBuilder.from(message.embeds[0]);

            updatedEmbed.data.fields[1].value = formatTime(remaining);
            updatedEmbed.data.fields[3].value = `${data.users.size}`;

            try {
                await message.edit({ embeds: [updatedEmbed], components: [row] });
            } catch {
                clearInterval(interval);
                giveaways.delete(message.id);
            }
        }, 5000);

        // ====== LOSOWANIE ======
        setTimeout(async () => {
            clearInterval(interval);

            const data = giveaways.get(message.id);
            if (!data) return;

            const usersArray = Array.from(data.users);

            const channel = await client.channels.fetch(data.channelId).catch(() => null);
            if (!channel) return;

            // Wyłączenie przycisku
            const disabledRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('join_giveaway')
                    .setLabel('Giveaway zakończony')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

            try {
                await message.edit({ components: [disabledRow] });
            } catch {}

            if (usersArray.length === 0) {
                await channel.send('🎉 Giveaway zakończony — brak uczestników.');
                giveaways.delete(message.id);
                return;
            }

            const winners = [];
            const pool = [...usersArray];

            for (let i = 0; i < data.zwyciezcy && pool.length > 0; i++) {
                const index = Math.floor(Math.random() * pool.length);
                winners.push(pool.splice(index, 1)[0]);
            }

            const winnersMention = winners.map(id => `<@${id}>`).join(', ');

            const resultEmbed = new EmbedBuilder()
                .setTitle('🎉 Wyniki konkursu 🎉')
                .setColor('#9b59b6')
                .addFields(
                    { name: '🏆 Nagroda', value: data.nagroda },
                    { name: '👑 Zwycięzcy', value: winnersMention },
                    { name: '👥 Uczestnicy', value: `${usersArray.length}` },
                );

            await channel.send({ content: `🎉 Gratulacje ${winnersMention}!`, embeds: [resultEmbed] });

            giveaways.delete(message.id);
        }, duration);
    },

    async button(interaction) {
        if (interaction.customId !== 'join_giveaway') return;

        const data = giveaways.get(interaction.message.id);
        if (!data) {
            return interaction.reply({
                content: '❌ Ten giveaway już się zakończył.',
                ephemeral: true
            });
        }

        const userId = interaction.user.id;

        if (data.users.has(userId)) {
            return interaction.reply({
                content: '❌ Już bierzesz udział!',
                ephemeral: true
            });
        }

        data.users.add(userId);

        const embed = EmbedBuilder.from(interaction.message.embeds[0]);
        embed.data.fields[3].value = `${data.users.size}`;

        await interaction.update({ embeds: [embed], components: interaction.message.components });

        await interaction.followUp({
            content: '🎉 Dołączyłeś do giveaway’a!',
            ephemeral: true
        });
    }
};
