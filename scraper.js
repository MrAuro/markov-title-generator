const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const userIds = ['639195300', '71092938'];
const clientId = process.env.CLIENT_ID;
const accessToken = 'Bearer ' + process.env.ACCESS_TOKEN;

async function getTitles(channel) {
	// GET https://api.twitch.tv/helix/videos

	let data = await axios.get('https://api.twitch.tv/helix/videos', {
		params: {
			user_id: channel,
			first: 100,
		},
		headers: {
			'Client-ID': clientId,
			Authorization: accessToken,
		},
	});

	return Array.from(new Set(data.data.data.filter((video) => video.type === 'archive').map((video) => video.title)));
}

async function getTitlesPaginated(channel, count) {
	let titles = [];
	let offset = 0;
	while (offset < count) {
		let data = await axios.get('https://api.twitch.tv/helix/videos', {
			params: {
				user_id: channel,
				first: 100,
				offset: offset,
			},
			headers: {
				'Client-ID': clientId,
				Authorization: accessToken,
			},
		});

		titles = titles.concat(data.data.data.filter((video) => video.type === 'archive').map((video) => video.title));
		offset += 100;
	}
	return titles;
}

async function main() {
	let fetchedTitles = [];
	for (let userId of userIds) {
		let titles = await getTitlesPaginated(userId, 500);
		for (let title of titles) {
			console.log(title);
			fetchedTitles.push(title);
		}
	}

	fs.writeFileSync('fetchedTitles.txt', fetchedTitles.join('\n'));
}

main();
