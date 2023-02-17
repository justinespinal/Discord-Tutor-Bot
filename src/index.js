require('dotenv').config();
const express = require('express');
const app = express();
const Bot = require('./Bot');
const deployCommands = require('./deployCommands');

(async () => {
	await Bot.loadCommands();
	await Bot.loadEvents();
	await deployCommands();
	//logs into the bot
	await Bot.login(process.env.BOT_TOKEN);

	//allows the bot to run 24/7 on replits cloud for free!
	app.get('/', (req, res) => res.status(200).send('Hello!'));
	app.listen(process.env.PORT, () => console.log(`Server alive on port ${process.env.PORT}.`));
})();

