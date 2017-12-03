const User = require('@userModel');

const fs = require('fs');

module.exports = (userId, file) => {

    return new Promise((resolve, reject) => {

        const src = fs.createReadStream(file.path);
        const dest = fs.createWriteStream(`public/images/avatars/${file.filename}`);

        src.pipe(dest);
        src.on('error', reject);

        User.setAvatar(userId, `/images/avatars/${file.filename}`)
            .then(resolve, reject);

    });

};

