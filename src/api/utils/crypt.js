const passwordKey = 'de7d844d-87ca-47be-8059-5e7738120b8d';
const passwordEncryptor = require('simple-encryptor')(passwordKey);

module.exports.encrptyPassword = (password) => {
    return passwordEncryptor.encrypt(password);
}

module.exports.decrptyPassword = (password) => {
    return passwordEncryptor.decrypt(password);
}