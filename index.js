const {Client, GatewayIntentBits} = require('discord.js')
const fs = require('fs')
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

sentences = [];
fullHam = "Oops I've experienced an error and don't ham properly."

try {
    const data = fs.readFileSync('hams.txt', 'utf8');
    console.log("hams.txt found successfully");

    //Split into sentences based on new lines and punctuation
    sentences = data.split(/[\r\n|.|!|?]/);
    //Remove sentences of length 0 (from ...)
    sentences = sentences.filter(value => value.length > 0);
    //Remove spaces at the start of sentences
    sentences = sentences.map(element => {
        if (element[0] == ' ')
            return element.substring(1);
        else
            return element;
        
    });
    //Make all sentences lowercase
    sentences = sentences.map(e => {return e.toLowerCase();});

    fullHam = data;


  } catch (err) {
    console.error(err);
  }

client.on('ready', () => {
    console.log("The botboi is ready")
})

client.on('messageCreate', (message) => {


    if (!message.author.bot)
    {
        //Might want to look into sanitizing this input at some point
        messageLC = message.content.toLowerCase();
        messageSentences = messageLC.split(/[!|.|?]/);

        same = messageSentences.filter(value => sentences.includes(value));
        //console.log(same);
        if (same.length > 0) {
            message.reply({
                content: fullHam
            })
        }
    }

})

client.login(process.env.TOKEN)