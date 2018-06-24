'use strict';
const q = require('q');
const User = require('./../models/user');
const auth = require('../auth/auth');

class UserController{
    login(email, password){
        let deferred = q.defer();
        User.findOne({email, password})
        .then((user) => {
            if(user){
                if(user.password === password){
                    let token = auth.sign({
                        name: user.name,
                        email: user.email,
                        division: user.mainDivision
                    });
                    deferred.resolve({
                        token,
                        division: user.mainDivision
                    });
                }
                else{
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