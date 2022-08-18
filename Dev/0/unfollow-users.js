const axios = require('axios');
const fs = require('fs');
const config = require('./config');

const AccountToFollow = require('./AccountToFollow');

function followAccounts(userAccounts) {
  userAccounts.forEach(async account => {
    const URL = `${config.followUN_api_url}/${account}`;
    await axios.delete(URL, {
      headers: {
        content_length: 0,
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${config.access_token}`
      }
    })
      .then(() => {
        console.log(`${account} has been unfollowed!`);
      })
      .catch(() => {
        console.error(`Error following  ${account}...`);
      });
  });
}

followAccounts(AccountToFollow);
