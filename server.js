const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

const prefix = 'tgr!';
const ownerID = '323775906835333121';
const active = new Map();
const serverStats = {
  guildID: '332459831523016704',
  totalUsersID: '464183518113562636',
  memberCountID: '464183881902325770',
  botCountID: '464183952123494400',
};

const botStats = {
  totalGuildsID: '464230086908837908',
  totalUsersID: '464229963869061141',
  totalChannelsID: '464230438995492888'
}

client.on('message', async message => {

  const args = message.content.slice(prefix.length).trim().split(' ');
  const cmd = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try{

    let ops = {
      ownerID: ownerID,
      active: active
    }

    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, ops);

  } catch (e) {
    console.log(e.stack);
  }

});

client.on('ready', () => console.log('Launched!'));

client.on('guildMemberAdd', member => {

  if (member.guild.id !== serverStats.guildID) return;

  client.channels.get(serverStats.totalUsersID).setName(`Összes felhasználó : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Tagok száma : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Botok száma : ${member.guild.members.filter(m => m.user.bot).size}`);
});

client.on('guildMemberRemove', member => {

  if (member.guild.id !== serverStats.guildID) return;

  client.channels.get(serverStats.totalUsersID).setName(`Összes felhasználó : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Tagok száma : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Botok száma : ${member.guild.members.filter(m => m.user.bot).size}`);
});

client.login('NDE4NDcwMTg0NDgzODE1NDI0.Dh6Ofw.Z5CKZ1SKQ5U_y_2eG-t905kCec4');
