const MemberController = require('../api/controllers/member');
const auth = require('../api/auth/auth');

const member = (app) => {
    app.get('/api/member/createdemo', (req, res) => {
        let controller = new MemberController();
        controller.demo()
            .then(data =>
                res.send(data)
            )
    });

    app.get('/api/member/search', auth.verifyToken, (req, res) => {
        let controller = new MemberController(req.user.division);
        controller.retrieve(req.query)
            .then(members => {
                if (members.length == 1)
                    res.send(members[0])
                else
                    res.send(members);
            })
            .catch(error => {
                res.status(500).send(`Error: ${error}`)
            });
    });

    app.post('/api/member/delete', auth.verifyToken, (req, res) => {
        let controller = new MemberController(req.user.division);
        controller.delete(req.body)
            .then(success =>
                res.send(success))
            .catch(error =>
                res.send(`Error: ${error}`)
            );
    });

    app.post('/api/member/create', auth.verifyToken, (req, res) => {

        let controller = new MemberController(req.user.division);
        controller.create(req.body)
            .then(success =>
                res.send(success))
            .catch(error =>
                res.send(`Error: ${error}`)
            );
    });

    app.post('/api/member/update', auth.verifyToken, (req, res) => {
        let controller = new MemberController(req.user.division);
        controller.update(req.body)
            .then(success =>
                res.send(success))
            .catch(error =>
                res.send(`Error: ${error}`)
            );
    });
}

module.exports = member; 