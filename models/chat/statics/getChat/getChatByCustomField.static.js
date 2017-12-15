module.exports.getChatById = function (_id, full) {
    const Chat = this;

    return new Promise((resolve, reject) => {
        if(full){
            Chat.findOne({ _id })
                .populate({
                    path: 'messages',
                    populate: [{ path: 'author' }, { path: 'target' }]
                })
                .populate({
                    path: 'members'
                })
                .exec((error, result) => {

                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);

                });
        }
        else {
            Chat.findOne({ _id })
                .exec((error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
        }
    });
};

module.exports.getChatByTitle = function (title, full) {
    const Chat = this;

    return new Promise((resolve, reject) => {
        if(full){
            Chat.findOne({ title })
                .populate({
                    path: 'messages',
                    populate: [{ path: 'author' }, { path: 'target' }]
                })
                .populate({
                    path: 'members'
                })
                .exec((error, result) => {

                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);

                });
        }
        else {
            Chat.findOne({ title })
                .exec((error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
        }
    });


};