const q = require('q');
const axios = require('axios');

module.exports.createDemo = () => {
    let deferred = q.defer();
    axios.post('/api/misc/createdemo')
    .then(user => {
        deferred.resolve(user.data); 
    });

    return deferred.promise;
}

module.exports.getAccounts = () => {
    let deferred = q.defer();
    axios('/api/member/search')
    .then(members => {
        deferred.resolve(members.data); 
    });

    return deferred.promise;
}

module.exports.getAccount = (_id) => {
    let deferred = q.defer();
    console.log(_id);
    axios.get('/api/member/search', {params: {_id}})
    // axios('/api/member/search', {_id})
    .then(members => {
        deferred.resolve(members.data); 
    });

    return deferred.promise;
}

module.exports.addAccount = (member) => {
    let deferred = q.defer();

    axios.post('/api/member/create', member)
    .then(member => {
        deferred.resolve(member);
    })
    .catch(err => {
        deferred.reject(err);
    });
    return deferred.promise;

}

module.exports.saveAccount = (member) => {
    let deferred = q.defer();

    axios.post('/api/member/update', member)
    .then(member => {
        deferred.resolve(member);
    })
    .catch(err => {
        deferred.reject(err);
    });
    return deferred.promise;

}

module.exports.deleteAccount = (memberId) => {
    let deferred = q.defer();
    axios.post('/api/member/delete', {_id: memberId})
    .then(() => {
        deferred.resolve();
    })
    .catch(err => {
        deferred.reject(err);
    });

    return deferred.promise;
}