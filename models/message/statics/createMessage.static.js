module.exports = function (messageObj) {

    const Message = this;
    const message = new Message(messageObj);

    return new Promise((resolve, reject) => {

        message.save((error, result, affected) => {

            if (error) {
                return reject(error);
            }
            return resolve(result);

        });

    });

};