const fs = require('fs');

const titles = fs.readFileSync('fetchedTitles.txt').toString().split('\n');

const asyncmarkov = require('async-markov');

const markov = new asyncmarkov();

for (let title of titles) {
	markov.add(title);
}

for (let i = 0; i < 10; i++) {
	let title = markov.generateSentences(1);
	while (title.split(' ').length < 5 || title.split(' ').length > 140) {
		title = markov.generateSentences(1);
	}
	console.log(title);
}
