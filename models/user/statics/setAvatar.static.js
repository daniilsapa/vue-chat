module.exports = function (_id, avatarUrl) {

    const User = this;
    console.log('USER', User);

    return new Promise((resolve, reject) => {

        try {

            User.updateOne({_id}, {$set: {avatarUrl}}, (error, result) => {

                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }

            })
        }
        catch(err) {
            console.log(err);
        }

    });

};