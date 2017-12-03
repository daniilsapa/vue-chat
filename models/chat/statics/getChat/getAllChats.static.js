module.exports = function (chatId) {

    const Chat = this;

    return new Promise(function(resolve, reject) {

        Chat.find({},(error, result) => {

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