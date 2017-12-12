const User = require('@userModel');

module.exports = (field, value) => {
    const searchCriteria = {};
    searchCriteria[field] = value;

    return new Promise((resolve, reject) => {
        User.getUserByCustomField(searchCriteria)
            .then(resolve, reject);
    });
};