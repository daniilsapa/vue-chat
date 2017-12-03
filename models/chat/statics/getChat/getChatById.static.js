module.exports = function (chatId, full) {

    const Chat = this;

    return new Promise((resolve, reject) => {

        if(full){
            Chat.findOne({_id: chatId})
                .populate({
                    path: 'messages',
                    populate: [{path: 'author'}, {path: 'target'}]
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
            Chat.findOne({_id: chatId},(error, result) => {

                if (error) {
                    return reject(error);
                }
                return resolve(result);

            });
        }

    });

};