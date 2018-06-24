const UserController = require('../api/controllers/user');

const user = (app) => {
    app.post('/api/login', (req, res) => {
        console.log(req.body);
        let controller = new UserController();
        controller.login(req.body.name, req.body.password)
            .then(token =>
                res.send(token))
            .catch(error =>
                res.send(`Error: ${error}`)
            );
    });
}

module.exports = user; 