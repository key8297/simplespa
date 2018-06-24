const MiscController = require('../api/controllers/misc');

const misc = (app) => {
    app.post('/api/misc/createdemo', (req, res) => {
        let controller = new MiscController();
        controller.createNewDemo()
            .then(user =>
                res.send(user)
            )
    });
}

module.exports = misc; 