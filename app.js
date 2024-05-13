// node-nlp kütüphanesini yükle
const { Client, IntentsBitField, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.MessageContent,
    ],
})

client.on('ready', (c) => console.log(`${c.user.tag} aktif!`));

const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['tr'] });


manager.addDocument('tr', 'roselia nedir', 'ABOUT');
manager.addDocument('tr', 'roselia software nedir', 'ABOUT');
manager.addDocument('tr', 'roselia software hakkında', 'ABOUT');
manager.addDocument('tr', 'hakkında', 'ABOUT');
manager.addDocument('tr', 'kimsin', 'ABOUT');

manager.addDocument('tr', 'hizmetleriniz', 'SERVICES');
manager.addDocument('tr', 'hizmetler', 'SERVICES');
manager.addDocument('tr', 'hizmet', 'SERVICES');
manager.addDocument('tr', 'yazılımlar', 'SERVICES');
manager.addDocument('tr', 'yazılım', 'SERVICES');
manager.addDocument('tr', 'yazılımları nelerdir', 'SERVICES');
manager.addDocument('tr', 'yazılımı nedir', 'SERVICES');

manager.addDocument('tr', 'geliştiriciler', 'DEVELOPMENT');
manager.addDocument('tr', 'geliştirme', 'DEVELOPMENT');
manager.addDocument('tr', 'geliştirdi', 'DEVELOPMENT');
manager.addDocument('tr', 'kim geliştirdi', 'DEVELOPMENT');
manager.addDocument('tr', 'seni kim', 'DEVELOPMENT');

manager.addDocument('tr', 'teşekkür', 'THANKS');
manager.addDocument('tr', 'sağol', 'THANKS');
manager.addDocument('tr', 'sağ ol', 'THANKS');
manager.addDocument('tr', 'iyisin', 'THANKS');

manager.addDocument('tr', 'nasılsın', 'HOWAREYOU');

manager.addDocument('tr', 'yardım', 'HELP')
manager.addDocument('tr', 'merhaba', 'HELP')
manager.addDocument('tr', 'sorum', 'HELP')

manager.addAnswer('tr', 'HELP', 'Merhabalar aklınızdaki sorularınızı veya sorunlarınızı dinlemek ve yardımcı olabilmek için heyecanlanıyorum. Lütfen soru/sorununuzu açıkça bana bildirin.');
manager.addAnswer('tr', 'HOWAREYOU', 'Merhabalar bugün çok daha iyiyim ve sizlere yardımcı olabilmek için heyecanlanıyorum. Aklınıza takılan bir şey mi var?');
manager.addAnswer('tr', 'THANKS', 'Güzel sözleriniz için teşekkür ederim, yardımcı olabildiysem ne mutlu bana.');
manager.addAnswer('tr', 'ABOUT', 'Merhaba ben Roselia Software Chat Botuyum ve burada sorularınızı cevaplandırmak için bulunuyorum.');
manager.addAnswer('tr', 'SERVICES', 'Roselia Software şirketinin şuan 2 tane yazılımı bulunmaktadır: Roselia Gaming Software ve RoseliaDB.');
manager.addAnswer('tr', 'DEVELOPMENT', 'Ben Roselia Software şirketi tarafından geliştirilmiş bir Chat botum. En yetkili geliştirici aynı zamanda Roselia Software şirketinin kurucusu olan emirxrq tarafından geliştiriliyorum. Amacım aklınızdaki soruları gidermek.');

manager.train().then(async () => {
    manager.save();
})

function customToLowerCase(str) {
 

    
    let newStr = str.toLowerCase();
    if (str.includes("I")) newStr = newStr.replace(/i/g, "ı");
    if (str.includes("Ö")) newStr = newStr.replace(/o/g, "ö");
    if (str.includes("Ü")) newStr = newStr.replace(/u/g, "ü");
    if (str.includes("Ğ")) newStr = newStr.replace(/g/g, "ğ");
    return newStr;
}

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    const message = msg.content;

    const command = "/chat"

    if (!message.startsWith(command)) return;
    const question = customToLowerCase(message.substring(command.length + 1));
    console.log(question);

    let response = await manager.process('tr', question);
    msg.channel.send(response.answer || "Maalesef bunun hakkında bilgi sahibi değilim. Sorunuzu açıkça belirtirseniz sevinirim.");
})

client.login("token");