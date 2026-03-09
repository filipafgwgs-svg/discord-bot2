const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        // -------------------------------
        // SELECT MENU (SHOP)
        // -------------------------------
        if (interaction.isStringSelectMenu()) {

            // -------------------------------
            // GŁÓWNE MENU
            // -------------------------------
            if (interaction.customId === 'shop_menu') {

                const value = interaction.values[0];

                // DISCORD — TWÓJ POPRAWIONY TEKST
                if (value === 'discord') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '**DISCORD — CENNIK**\n\n' +

                            '**Nitro -**\n' +
                            'D1SC0RD N1TR0 GIFT\n' +
                            '<:nitrobasic:1463269358670319626> discord nitro basic 1m - 7 zł\n' +
                            '<:nitrobasic:1463269358670319626> discord nitro basic 1y - soon\n' +
                            '<:nitroboost:1463269280123453491> discord nitro boost 1m - 20 zł\n' +
                            '<:nitroboost:1463269280123453491> discord nitro boost 1y - soon\n' +
                            '<:nitroboost:1463269280123453491> promo code 3 month nitro - 4 zł\n\n' +

                            '**Boosty/boost -**\n' +
                            '2 tygodniowe boosty/2 weeks boost:\n' +
                            '<:Boost:1462444514521256088> 14 boostów - 15 zł\n\n' +

                            '1 miesiąc/1 month:\n' +
                            '<:Boost:1462444514521256088> 2 boosty 1lvl - 4 zł\n' +
                            '<:Boost:1462444514521256088> 8 boostów 2lvl - 10 zł\n' +
                            '<:Boost:1462444514521256088> 14 boostów 3lvl - 16 zł\n\n' +

                            '3 miesiące/3 month:\n' +
                            '<:Boost:1462444514521256088> 2 boosty 1lvl - 10 zł\n' +
                            '<:Boost:1462444514521256088> 8 boostów 2lvl - 17 zł\n' +
                            '<:Boost:1462444514521256088> 14 boostów 3lvl - 30 zł'
                    });
                }

                // ⭐ VPN — DODANE + EMOTKA SURFSHARK
                if (value === 'vpn') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '**VPN**\n\n' +
                            '<:SurfShark:1462454856332607508> Surfshark Lifetime — 7 zł'
                    });
                }

                // SOCIAL BOOSTING — SELECT MENU
                if (value === 'social') {

                    const socialMenu = new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('social_menu')
                            .setPlaceholder('Wybierz platformę…')
                            .addOptions([
                                {
                                    label: 'Instagram',
                                    value: 'ig',
                                    emoji: { id: '1462444762547228755', name: 'Instagram' }
                                },
                                {
                                    label: 'TikTok',
                                    value: 'tt',
                                    emoji: { id: '1462444603633307799', name: 'Tiktok' }
                                },
                                {
                                    label: 'Spotify',
                                    value: 'sp',
                                    emoji: { id: '1462444451912749255', name: 'Spotify' }
                                },
                                {
                                    label: 'Twitch',
                                    value: 'tw',
                                    emoji: { id: '1462444709602398280', name: 'Twitch' }
                                },
                                {
                                    label: 'YouTube',
                                    value: 'yt',
                                    emoji: { id: '1462444416252772433', name: 'You' }
                                },
                                {
                                    label: 'Kick',
                                    value: 'kick',
                                    emoji: { id: '1473361345813676236', name: 'kick' }
                                }
                            ])
                    );

                    return interaction.reply({
                        ephemeral: true,
                        content: '**SOCIAL BOOSTING — WYBIERZ PLATFORMĘ**',
                        components: [socialMenu]
                    });
                }

                // ⭐⭐⭐ POPRAWIONA SEKCJA LOL — GUI ⭐⭐⭐
                if (value === 'lol') {

                    const lolMenu = new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('lol_menu')
                            .setPlaceholder('Wybierz kategorię…')
                            .addOptions([
                                {
                                    label: 'Skiny/Skins',
                                    value: 'skins',
                                    emoji: { name: 'lol', id: '1463243204437479545' }
                                },
                                {
                                    label: 'Przepustki/Pass',
                                    value: 'passes',
                                    emoji: { name: 'lol', id: '1463243204437479545' }
                                },
                                {
                                    label: 'Inne/Other',
                                    value: 'other',
                                    emoji: { name: 'lol', id: '1463243204437479545' }
                                }
                            ])
                    );

                    return interaction.reply({
                        ephemeral: true,
                        content: '**LEAGUE OF LEGENDS — WYBIERZ KATEGORIĘ**',
                        components: [lolMenu]
                    });
                }

                // STREAMINGI
                if (value === 'streamingi') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '**STREAMINGI**\n\n' +
                            'Disney+ — 7 zł\n' +
                            'Crunchyroll — 4 zł\n' +
                            'Molotov.tv — 5 zł\n' +
                            'HBO Max — 7 zł\n\n' +
                            'Szukasz innych? Zapytaj w tickecie ^^\n' +
                            'Are you looking for others? Ask in ticket ^^'
                    });
                }

                // INNE
                if (value === 'inne') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '**INNE/OTHERS**\n\n' +
                            '1 month ChatGPT+ — 7 zł\n' +
                            'Lifetime Duolingo Premium — 4 zł\n' +
                            'CapCut Pro — 5 zł'
                    });
                }

                // METODY / DOSTAWCY
                if (value === 'metody') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '**METODY / DOSTAWCY**\n\n' +
                            '**Metody:**\n' +
                            'Metoda na tanie jedzenie UE/Glovo — 8 zł\n' +
                            'Metoda SMS — 5 zł\n' +
                            'Metoda VPS — 3 zł\n\n' +
                            '**Dostawcy:**\n' +
                            'Dostawca League of Legends — 15 zł\n' +
                            'Dostawca Social‑Boosting — 15 zł\n' +
                            'Dostawca Discord Boost — 20 zł\n' +
                            'Dostawca Discord Nitro — 20 zł'
                    });
                }
            }

            // -------------------------------
            // SOCIAL BOOSTING — PODMENU
            // -------------------------------
            if (interaction.customId === 'social_menu') {

                const platform = interaction.values[0];

                if (platform === 'ig') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:Instagram:1462444762547228755> **Instagram** <:Instagram:1462444762547228755>\n' +
                            '500 Followers — 9 zł\n' +
                            '1000 Followers — 15 zł\n' +
                            '2500 Followers — 37 zł\n' +
                            '5000 Followers — 70 zł\n' +
                            '10000 Followers — 135 zł'
                    });
                }

                if (platform === 'tt') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:Tiktok:1462444603633307799> **TikTok** <:Tiktok:1462444603633307799>\n' +
                            '**Followers**\n' +
                            '250 — 6 zł\n' +
                            '500 — 10 zł\n' +
                            '1000 — 15 zł\n' +
                            '2500 — 32 zł\n' +
                            '5000 — 60 zł\n\n' +
                            '**Views**\n' +
                            '1000 — 10 zł\n\n' +
                            '**Favorites**\n' +
                            '~100 — 5 zł'
                    });
                }

                if (platform === 'sp') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:Spotify:1462444451912749255> **Spotify** <:Spotify:1462444451912749255>\n' +
                            '1000 Followers — 5 zł\n' +
                            '2500 Followers — 8 zł\n' +
                            '5000 Followers — 11 zł'
                    });
                }

                if (platform === 'tw') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:Twitch:1462444709602398280> **Twitch** <:Twitch:1462444709602398280>\n' +
                            '250 Followers — 4 zł\n' +
                            '500 Followers — 6 zł\n' +
                            '1000 Followers — 10 zł\n' +
                            '2500 Followers — 20 zł\n' +
                            '5000 Followers — 35 zł\n' +
                            '10000 Followers — 65 zł\n\n' +
                            '**Widzowie/h:**\n' +
                            'SOON'
                    });
                }

                if (platform === 'yt') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:You:1462444416252772433> **YouTube** <:You:1462444416252772433>\n' +
                            'SOON'
                    });
                }

                if (platform === 'kick') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:kick:1473361345813676236> **Kick** <:kick:1473361345813676236>\n' +
                            '**Widzowie/h**\n' +
                            '10 — 1 zł\n' +
                            '25 — 2 zł\n' +
                            '50 — 3 zł\n' +
                            '100 — 5 zł\n' +
                            '500 — 10 zł'
                    });
                }
            }

            // -------------------------------
            // LEAGUE OF LEGENDS — PODMENU
            // -------------------------------
            if (interaction.customId === 'lol_menu') {

                const pick = interaction.values[0];

                if (pick === 'skins') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:lol:1463243204437479545> **CENNIK SKINÓW LOL**\n' +
                            'Niezwykłe – 520 RP ~ 15 zł\n' +
                            'Rzadkie – 750 RP ~ 23 zł\n' +
                            'Epickie – 1350 RP ~ 45 zł\n' +
                            'Legendarne – 1820 RP ~ 60 zł\n' +
                            'Ultimate – 3250 RP ~ 95 zł\n' +
                            'Inne ceny skinów za RP dogadujemy na tickecie'
                    });
                }

                if (pick === 'passes') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:lol:1463243204437479545> **CENY PRZEPUSTEK LOL**\n' +
                            'Standardowa przepustka – 1650 RP ~ 55 zł\n' +
                            'Przepustka Bundle – 2650 RP ~ 78 zł\n' +
                            'Przepustka Bundle Premium – 3650 RP ~ 100 zł'
                    });
                }

                if (pick === 'other') {
                    return interaction.reply({
                        ephemeral: true,
                        content:
                            '<:lol:1463243204437479545> **INNE**\n' +
                            'Tajemnicza skórka – 20 zł\n' +
                            'Tajemnicza skórka premium – 30 zł\n' +
                            'Ikona – 10 zł\n' +
                            '5 skrzyń hextech + klucze – 30 zł'
                    });
                }
            }
        }

        // -------------------------------
        // PRZYCISK 🇬🇧 TRANSLATE (TICKET PANEL)
        // -------------------------------
        if (interaction.isButton()) {
            if (interaction.customId === 'translate_ticket') {

                const translated = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('🎫 VNV-SHOP × CREATE TICKET')
                    .setDescription(
                        '**Do you have a problem, want to place an order, or have any questions?**\n' +
                        '━━━━━━━━━━━━━━━━━━━━\n' +
                        '📩 × To create a ticket, please choose the correct category!'
                    )
                    .setFooter({ text: 'VNV-SHOP — Customer Support System' });

                return interaction.reply({
                    ephemeral: true,
                    embeds: [translated]
                });
            }

            // -------------------------------
            // PRZYCISK 🇬🇧 TRANSLATE — OPCJE MENU (TICKET PANEL)
            // -------------------------------
            if (interaction.customId === 'translate_ticket_options') {

                const translatedOptions = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('🎫 Ticket Categories — English Version')
                    .setDescription(
                        '**Here are the available ticket categories:**\n\n' +
                        '📦 **Orders** — Open a ticket regarding an order\n' +
                        '🛠️ **Support** — Get technical support\n' +
                        '🤝 **Partnership** — Start a partnership\n' +
                        '⚠️ **Order issue** — Report a problem with an order\n\n' +
                        '*Select the appropriate category from the menu above.*'
                    );

                return interaction.reply({
                    ephemeral: true,
                    embeds: [translatedOptions]
                });
            }

            // -------------------------------
            // PRZYCISK 🇬🇧 TRANSLATE (SHOP PANEL)
            // -------------------------------
            if (interaction.customId === 'translate_shop') {

                const translatedShop = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('💜 VNV‑SHOP — PRICE LIST')
                    .setDescription(
                        '**At VNV‑SHOP we offer a wide range of services:**\n' +
                        'nitro, boosts, social boosting, streaming services, methods and many other products.\n\n' +
                        '**Each category has been carefully prepared** to give you quick access to the full offer and current prices.\n\n' +
                        '**Browse the sections below and choose the category you are interested in.**\n' +
                        'Let us guide you through the offer in a simple, clear and professional way.'
                    );

                return interaction.reply({
                    ephemeral: true,
                    embeds: [translatedShop]
                });
            }
        }
    }
};
