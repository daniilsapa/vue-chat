module.exports = function (messageId, full) {

    const Message = this;

    return new Promise((resolve, reject) => {

        if(full){
            Message.findOne({_id: messageId})
                   .populate({path: 'author'})
                   .exec((error, result) => {

                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);

                    });
        }
        else {
            Message.findOne({_id: messageId},(error, result) => {

                if (error) {
                    return reject(error);
                }
                return resolve(result);

            });
        }

    });

};