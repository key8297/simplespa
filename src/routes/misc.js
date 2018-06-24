const MiscController = require('../api/controllers/misc');
const auth = require('../api/auth/auth');

const misc = (app) => {
    app.post('/api/misc/createdemo', (req, res) => {
        let controller = new MiscController();
        controller.createNewDemo()
            .then(user =>
                res.send(user)
            )
    });

    app.get('/api/misc/verifyToken', auth.verifyToken, (req, res) => {
        res.sendStatus(200);
    });
}

module.exports = misc; 