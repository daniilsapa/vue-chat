module.exports.setTitle = function (_id, title) {
    const Chat = this;

    console.log('search criteria', { _id });

    return new Promise((resolve, reject) => {

        Chat.updateOne({ _id }, { $set: { title } },(error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};