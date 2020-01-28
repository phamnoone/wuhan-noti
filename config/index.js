var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        token: 'xoxb-288811805300-RRlB0AKP8nxzg7yMuTJkAXk8',
        bot: {
            name: process.env.SLACK_BOT_NAME,
            id: 'U8GPVPP8U'
        }
    },

    production: {
        root: rootPath,
        token: '',
        bot: {
            name: 'slack-bot',
            id: ''
        }
    }
};

module.exports = config[env];
