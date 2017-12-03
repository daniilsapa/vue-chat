module.exports = function (chat, message, option) {

    const Chat = this;

    return new Promise((resolve, reject) => {

        Chat.updateOne({_id: chat}, {$push: {messages: message}},(error, result) => {

            if (error) {
                return reject(error);
            }
            return resolve(result);

        });

    });

};