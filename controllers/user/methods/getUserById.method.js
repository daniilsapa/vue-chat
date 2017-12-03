const User = require('@userModel');

module.exports = userId => {

    return new Promise((resolve, reject) => {

        User.getUserById(userId)
            .then(resolve, reject);

    });

};