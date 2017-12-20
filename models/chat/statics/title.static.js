module.exports.setTitle = function (_id, title) {
    const Chat = this;

    return new Promise((resolve, reject) => {

        Chat.updateOne({ _id }, { $set: { title } },(error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};