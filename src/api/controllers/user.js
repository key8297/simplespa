'use strict';
const q = require('q');
const User = require('./../models/user');
const auth = require('../auth/auth');
const crypt = require('../utils/crypt');

class UserController {

    constructor(division) {
        this.division = division;
    }

    createDemoUser() {
        let deferred = q.defer();
        let division = this.division;
        let unencryptPassword = `pass${division}`;
        let password = crypt.encrptyPassword(unencryptPassword);

        let user = new User({
            name: `user${division}`,
            password,
            division
        }
        );

        user.save()
            .then(saved => {
                let ret = Object.assign(saved, { password: unencryptPassword });
                deferred.resolve(ret)
            });

        return deferred.promise;
    }

    login(name, password) {
        let deferred = q.defer();
        User.findOne({ name })
            .then((user) => {
                if (user) {
                    let decrypted = crypt.decrptyPassword(user.password);
                    if (decrypted === password) {
                        let token = auth.sign({
                            name: user.name,
                            division: user.division
                        });
                        deferred.resolve({
                            token,
                            division: user.division
                        });
                    }
                    else {
                        deferred.reject('Invalid password');
                    }
                }
                else {
                    deferred.reject(`User not found`);
                }
            });

        return deferred.promise;
    }
}

module.exports = UserController