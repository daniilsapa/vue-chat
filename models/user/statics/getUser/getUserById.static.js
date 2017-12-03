module.exports = function (_id) {

    const User = this;

    return new Promise((resolve, reject) => {

        User.findOne({_id}, (error, result) => {

            if (error) {
                reject({error});
            }
            else if (result) {
                resolve(result, 200);
            }
            else {
                resolve(null);
            }

        })

    });

};