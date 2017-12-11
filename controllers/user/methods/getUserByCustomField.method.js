const User = require('@userModel');

module.exports = (field, value) => {

    return new Promise((resolve, reject) => {
        User.getUserById({}[field] = value)
            .then(resolve, reject);

    });
};