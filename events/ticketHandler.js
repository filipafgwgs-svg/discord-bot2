const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    AttachmentBuilder
} = require('discord.js');

const fs = require('fs');
const path = require('path');

const LOG_CHANNEL = '1470491974560780408';
const CEO_ROLE = '1450927028164362455';

const countersPath = path.join(__dirname, '../ticketCounters.json');
let counters = require(countersPath);

function saveCounters() {
    fs.writeFileSync(countersPath, JSON.stringify(counters, null, 2));
}

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        // ====== OTWIERANIE TICKETA ======
        if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_select') {
            const type = interaction.values[0];
            const user = interaction.user;

            const existing = interaction.guild.channels.cache.find(
                ch => ch.name.includes(user.id)
            );

            if (existing) {
                return interaction.reply({
                    content: '❌ Masz już otwarty ticket!',
                    ephemeral: true
                });
            }

            // Zwiększamy licznik w pliku
            counters[type]++;
            saveCounters();

            // Zwiększamy globalny licznik dla statusu
            if (!client.ticketCount) client.ticketCount = 0;
            client.ticketCount++;

            const number = String(counters[type]).padStart(3, '0');

            const names = {
                zamowienia: `zamowienie-${number}`,
                support: `support-${number}`,
                wspolpraca: `wspolpraca-${number}`,
                problem_zamowienie: `problem-${number}`
            };

            const channel = await interaction.guild.channels.create({
                name: names[type],
                type: 0,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: user.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ReadMessageHistory
                        ]
                    },
                    {
                        id: client.user.id,
                        allow: [PermissionFlagsBits.ViewChannel]
                    }
                ]
            });

            const embed = new EmbedBuilder()
                .setTitle('🎫 Ticket otwarty')
                .setDescription('Opisz swój problem lub sprawę, a administracja wkrótce odpowie.')
                .setColor('#6A0DAD');

            const closeBtn = new ButtonBuilder()
                .setCustomId('close_ticket_confirm')
                .setLabel('Zamknij ticket')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder().addComponents(closeBtn);

            await channel.send({
                content: `<@${user.id}> <@&${CEO_ROLE}>`,
                embeds: [embed],
                components: [row]
            });

            return interaction.reply({
                content: `🎫 Ticket został otwarty: ${channel}`,
                ephemeral: true
            });
        }

        // ====== POTWIERDZENIE ZAMKNIĘCIA ======
        if (interaction.isButton() && interaction.customId === 'close_ticket_confirm') {
            const confirmBtn = new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Potwierdź zamknięcie')
                .setStyle(ButtonStyle.Danger);

            const cancelBtn = new ButtonBuilder()
                .setCustomId('cancel_close')
                .setLabel('Anuluj')
                .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder().addComponents(confirmBtn, cancelBtn);

            return interaction.reply({
                content: 'Czy na pewno chcesz zamknąć ticket?',
                components: [row],
                ephemeral: true
            });
        }

        // ====== ANULOWANIE ======
        if (interaction.isButton() && interaction.customId === 'cancel_close') {
            return interaction.update({
                content: '❎ Zamknięcie anulowane.',
                components: []
            });
        }

        // ====== ZAMYKANIE TICKETA + TRANSKRYPT ======
        if (interaction.isButton() && interaction.customId === 'close_ticket') {
            const channel = interaction.channel;

            const messages = await channel.messages.fetch({ limit: 100 });
            const sorted = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

            let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Transkrypt - ${channel.name}</title>
<style>
body { font-family: Arial; background: white; padding: 20px; }
.msg { margin-bottom: 15px; }
.author { font-weight: bold; }
.time { color: gray; font-size: 12px; }
</style>
</head>
<body>
<h2>Transkrypt: ${channel.name}</h2>
<hr>
`;

            sorted.forEach(msg => {
                html += `
<div class="msg">
    <div class="author">${msg.author.tag}</div>
    <div class="time">${new Date(msg.createdTimestamp).toLocaleString()}</div>
    <div class="content">${msg.content || '[Załącznik]'}</div>
</div>
`;
            });

            html += `
</body>
</html>
`;

            const filePath = path.join(__dirname, `../transcript-${channel.name}.html`);
            fs.writeFileSync(filePath, html);

            const attachment = new AttachmentBuilder(filePath);

            const logEmbed = new EmbedBuilder()
                .setTitle('📁 Ticket zamknięty')
                .setDescription(`Ticket: ${channel.name}\nZamknięty przez: <@${interaction.user.id}>`)
                .setColor('#e74c3c')
                .setTimestamp();

            const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL);
            if (logChannel) {
                await logChannel.send({
                    embeds: [logEmbed],
                    files: [attachment]
                });
            }

            await interaction.update({
                content: '🗑 Ticket zostanie zamknięty za 3 sekundy...',
                components: []
            });

            setTimeout(() => channel.delete(), 3000);
        }
    }
};
