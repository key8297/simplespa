const MemberController = require('../api/controllers/member');

const member = (app) => {
    app.get('/api/member/createdemo', (req, res) => {
        let controller = new MemberController();
        controller.demo()
            .then(data =>
                res.send(data)
            )
    });

    app.get('/api/member/search', (req, res) => {
        console.log(req.query);
        console.log(req.params);
        console.log(req.body);
        let controller = new MemberController();
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

    app.post('/api/member/delete', (req, res) => {
        let controller = new MemberController();
        controller.delete(req.body)
            .then(success =>
                res.send(success))
            .catch(error =>
                res.send(`Error: ${error}`)
            );
    });

    app.post('/api/member/create', (req, res) => {
        
        let controller = new MemberController();
        controller.create(req.body)
            .then(success =>
                res.send(success))
            .catch(error =>
                res.send(`Error: ${error}`)
            );
    });

    app.post('/api/member/update', (req, res) => {
        console.log(req.body);
        let controller = new MemberController();
        controller.update(req.body)
            .then(success =>
                res.send(success))
            .catch(error =>
                res.send(`Error: ${error}`)
            );
    });
}

module.exports = member; 