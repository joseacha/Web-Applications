// Load environment variables from a .env file
require("dotenv/config");

// Import necessary modules
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

// Create a new Discord client with certain intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

// When the client is ready, log a message to the console
client.on('ready', () => {
    console.log("***OpenAI Bot Online***");
});

// Create a new OpenAI configuration using the API key from the .env file
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

// Create a new OpenAI API client using the configuration
const openai = new OpenAIApi(configuration);

// Listen for new messages and respond with OpenAI-generated text
client.on('messageCreate', async (message) => {

    // Ignore messages from bots, messages not in the designated channel, and commands starting with "!"
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    if (message.content.startsWith('!')) return;

    // **Log the message to the console (DEBUGGING)
    //console.log(message);

    // Set up a conversation log with a default message from the bot
    let conversationLog = [{ role: 'system', content: "You are a friendly chatbot." }]

    // Send a "typing" indicator to the channel
    await message.channel.sendTyping();

    // Fetch the previous 15 messages in the channel and reverse the order
    let prevMesssages = await message.channel.messages.fetch({ limit: 15 });
    prevMesssages.reverse();

    // Add previous messages to the conversation log, skipping messages from bots or commands
    prevMesssages.forEach((msg) => {
        if (msg.content.startsWith('!')) return;
        if (msg.author.id !== client.user.id && message.author.bot) return;
        if (msg.author.id !== message.author.id) return;

        conversationLog.push({
            role: 'user',
            content: msg.content,
        });
    });

    // Generate a response from OpenAI using the conversation log and a maximum token length
    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        max_tokens: 400,
    });

    // Reply to the original message with the generated text
    message.reply(result.data.choices[0].message);
});

// Log in to Discord using the bot's token from the .env file
client.login(process.env.TOKEN);
