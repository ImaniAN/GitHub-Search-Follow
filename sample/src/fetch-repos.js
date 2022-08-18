const axios = require('axios');
const fs = require('fs');
const config = require('./config');

const username = config.github_username;
const URL = `${config.api_url}/users/${username}/repos`;

async function fetchRepos(url) {
  const repos = [];
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
        const forkedRepos = res.data
          .filter(repo => repo.fork)
          .map(repo => repo.full_name);
        console.log(
          `[Page ${page}] Found ${forkedRepos.length} User(s) out of ${
            res.data.length
          }:`,
        );
        console.log(forkedRepos.join('\n') + '\n');
        repos.push(...forkedRepos);
        page++;
      })
      .catch(err => {
        console.error(`Error fetching page ${page}: ${err}`);
        stopFinding = true;
      });
  }
  return repos;
}

fetchRepos(URL).then(result => {
  console.log('Forked repos found:', result.length);
  console.log(result.join('\n'));
  fs.writeFileSync('repos.json', JSON.stringify(result, null, 2));
});
