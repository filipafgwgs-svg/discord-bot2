const fs = require('fs');
const path = require('path');
const {
    Client,
    GatewayIntentBits,
    Collection,
    REST,
    Routes
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.ticketCount = 0; // globalny licznik ticketów w pamięci

// ====== ŁADOWANIE KOMEND Z FOLDERU "commands" ======

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// ====== REJESTRACJA KOMEND NA SERWERZE ======

client.once('ready', async () => {
    console.log(`Zalogowano jako ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
            { body: commands }
        );
        console.log("Slash commands zarejestrowane!");
    } catch (error) {
        console.error(error);
    }

    // ====== WCZYTANIE LICZNIKA TICKETÓW Z ticketCounters.json ======
    try {
        const countersPath = path.join(__dirname, 'ticketCounters.json');
        const counters = JSON.parse(fs.readFileSync(countersPath, 'utf8'));
        client.ticketCount = Object.values(counters).reduce((a, b) => a + b, 0);
    } catch (err) {
        console.log("Nie udało się wczytać ticketCounters.json, ustawiam 0.");
        client.ticketCount = 0;
    }

    // ====== ROTACJA STATUSÓW ======
    const statuses = [
        () => ({ text: 'VNV‑SHOP — najlepsze ceny', type: 3 }),

        () => {
            const guild = client.guilds.cache.get(process.env.GUILD_ID);
            if (!guild) return { text: 'VNV‑SHOP', type: 3 };

            const onlineMembers = guild.members.cache.filter(
                m => m.presence && m.presence.status !== 'offline'
            ).size;

            return { text: `${onlineMembers} osób online`, type: 3 };
        },

        () => ({ text: 'VNV‑SHOP — częste konkursy', type: 3 }),

        () => ({ text: `Zrobiliśmy już ${client.ticketCount} ticketów`, type: 3 })
    ];

    let index = 0;

    setInterval(() => {
        const status = statuses[index]();
        client.user.setActivity(status.text, { type: status.type });
        index = (index + 1) % statuses.length;
    }, 10000);
});

// ====== OBSŁUGA KOMEND I PRZYCISKÓW ======

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Wystąpił błąd podczas wykonywania komendy!',
                ephemeral: true
            });
        }
    }

    if (interaction.isButton()) {
        for (const cmd of client.commands.values()) {
            if (cmd.button) {
                await cmd.button(interaction, client);
            }
        }
    }
});

// ====== ŁADOWANIE EVENTÓW Z FOLDERU "events" ======

const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
} else {
    console.warn('Folder "events" nie istnieje — utwórz go, aby eventy działały.');
}

client.login(process.env.TOKEN);
