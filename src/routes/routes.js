const webRoute = require('./webRoute');
const member = require('./member');
const misc = require('./misc');

const routes = (app) => {
    misc(app);
    webRoute(app);
    member(app);
}

module.exports = routes; 