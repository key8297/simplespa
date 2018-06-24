const webRoute = require('./webRoute');
const member = require('./member');
const misc = require('./misc');
const user = require('./user');

const routes = (app) => {
    misc(app);
    webRoute(app);
    member(app);
    user(app);
}

module.exports = routes; 