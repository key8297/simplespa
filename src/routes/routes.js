const webRoute = require('./webRoute');
const member = require('./member');

const routes = (app) => {
    
    webRoute(app);
    member(app);
}

module.exports = routes; 