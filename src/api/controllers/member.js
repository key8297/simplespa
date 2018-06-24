'use strict';
const q = require('q');
const Member = require('../models/member');

class MemberController {

    constructor(division) {
        this.division = division;
    }

    demo(division) {
        let deferred = q.defer();
        console.log('demo');
        const faker = require('faker');

        Member.findOne({}, 'code', { sort: { code: -1 } })
            .then(data => {
                let next = 1;
                if (data != null) {
                    next = data.code + 1;
                }
                for (let i = 0; i < 5; i++) {
                    let fake = faker.helpers.createCard();
                    let member = Object.assign(new Member(),
                        {
                            code: i + next,
                            name: fake.name,
                            email: fake.email,
                            phone: fake.phone,
                            company: fake.company.name,
                            website: fake.website,
                            address: fake.address,
                            division
                        });
                    member.save();
                }
                deferred.resolve('Completed');
            })

        return deferred.promise;
    }

    create(newMember) {
        let deferred = q.defer();
        let division = this.division;
        Member.findOne({}, 'code', { sort: { code: -1 } })
            .then(latest => {
                let code = 1;
                if (latest) code = latest.code + 1;

                let member = Object.assign(new Member(), newMember, { code, division });
                member.save()
                .then(member => deferred.resolve(member)
            )
            });

        return deferred.promise;
    }

    update(updateMember) {
        let deferred = q.defer();
        let division = this.division;

        Member.findOne({ _id: updateMember._id })
            .then(current => {
                let readOnly = { _id: current._id, division, code: current.code };
                let member = Object.assign(current, updateMember, readOnly);
                member.save();
                deferred.resolve(member);
            });
        return deferred.promise;
    }

    retrieve(filter) {
        let deferred = q.defer();
        let division = this.division;
        filter = Object.assign(filter, { division });
        Member.find(filter)
            .then(members => deferred.resolve(members));
        return deferred.promise;
    }

    delete(filter) {
        let deferred = q.defer();
        let division = this.division;
        filter = Object.assign(filter, { division });
        Member.remove(filter)
            .then(err => {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve('Success');
                }
            });
        return deferred.promise;
    }
}

module.exports = MemberController;