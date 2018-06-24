'use strict';
const q = require('q');
const MemberController = require('./member');
const UserController = require('./user');

const Member = require('../models/member');
// const User = require('../models/user');

class MiscController {

    constructor(){
        this.createDemo = this.createDemo.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    getDivision(){
        let deferred = q.defer();
        Member.findOne({},'division',{sort:{division:-1}})
        .then(latest => {
            let division = 100;
            if(latest){
               division = latest.division + 1; 
            }          

            deferred.resolve(division);
        });8
        return deferred.promise;
    }

    createDemo(division){
        let deferred = q.defer();
        let controller = new MemberController();
        controller.demo(division)
        .then(() => {
            deferred.resolve(division);
        });

        return deferred.promise;
    }

    createUser(division){
        let controller = new UserController(division);
        return controller.createDemoUser();
        // let deferred = q.defer();

        // let user = new User(
        //     {
        //         name: `user${division}`,
        //         password: `pass${division}`,
        //         division
        //     }
        // );

        // user.save()
        // .then(user => 
        //     deferred.resolve(user));

        // return deferred.promise;
    }

    createNewDemo(){
        let deferred = q.defer();
        this.getDivision()
        .then(division => {
            return this.createDemo(division);            
        })
        .then(division => {
            return this.createUser(division);
        })
        .then(user => {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

}

module.exports = MiscController;