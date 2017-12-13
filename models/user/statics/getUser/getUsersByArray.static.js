module.exports.getUsersByArrayOfIds = function (array) {
    const Chat = this;

    return new Promise((resolve, reject) => {

        Chat.find({ _id: { $in: array } })
            .exec((error, result) => {
                if (error) {
                    return reject({ error });
                }
                return resolve(result);
            });
    });
};