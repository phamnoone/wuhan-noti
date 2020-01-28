module.exports = function(config) {
    var RtmClient = require('@slack/client').RtmClient;
    return new RtmClient(config.token);
};
