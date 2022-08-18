const axios = require('axios');
const fs = require('fs');
const config = require('./config');

const username = config.github_username;
const URL = `${config.base_api_url}/${account}`;

async function fetchAccounts(url) {
  const accounts = [];
  let page = 1;
  let stopFinding = false;
  while (!stopFinding) {
    await axios
      .get(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${config.access_token}`
        },
        params: {
          page
        },
      })
      .then(res => {
        if (res.data.length === 0) {
          stopFinding = true;
          return;
        }
        const searchedAccounts = res.data.items
          .map(UserAccounts => UserAccounts.login);
        console.log(
          `[Page ${page}] Found ${searchedAccounts.length} User(s) out of ${
            res.data.length
          }:`,
        );
        console.log(searchedAccounts.join('\n') + '\n');
        accounts.push(...searchedAccounts);
        page++;
      })
      .catch(err => {
        console.error(`Error fetching page ${page}: ${err}`);
        stopFinding = true;
      });
  }
  return accounts;
}

fetchAccounts(URL).then(result => {
  console.log('Number of accounts found:', result.length);
  console.log(result.join('\n'));
  fs.writeFileSync('accounts-to-unfollow.json', JSON.stringify(result, null, 2));
});
