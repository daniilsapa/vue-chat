module.exports = function (chatId) {

    const User = this;

    return new Promise(function(resolve, reject) {

        User.updateMany({isBanned: false}, {$push: {availableChats: chatId}},(error, result) => {

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