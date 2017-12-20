module.exports.setCover = function (_id, coverUrl) {
    const Chat = this;

    return new Promise((resolve, reject) => {
        try {
            Chat.updateOne({ _id }, { $set: { coverUrl } }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            })
        }
        catch(err) {
            reject({ error })
        }
    });
};