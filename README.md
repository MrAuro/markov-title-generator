# markov-title-generator
Generates Twitch titles based off of a markov chain

How to use:
- Edit user id's in scraper.js for the list of users you want to train the markov model on
- Create a new `.env` with the following K/V pairs:
```
CLIENT_ID=twitch-client-id
ACCESS_TOKEN=twitch-access-token
```
- `node scraper.js`
- `node markov.js`
- Voila! Your titles should be printed in the terminal
