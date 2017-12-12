const Chat = require('@chatModel');

const fs = require('fs');

module.exports = (chatId, file) => {

    return new Promise((resolve, reject) => {
        const src = fs.createReadStream(file.path);
        const dest = fs.createWriteStream(`public/images/covers/${ file.filename }`);

        src.pipe(dest);
        src.on('error', reject);

        Chat.setCover(chatId, `/images/covers/${ file.filename }`)
            .then(resolve, reject);
    });
};