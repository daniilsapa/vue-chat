//IMPORTED MODELS
const User = require('@userModel');

module.exports.getUsernamesOfTypingUsers = async (array) => {
    let typingUsers = await User.getUsersByArrayOfIds(array);

    typingUsers = typingUsers.map(item => {
        return item.username;
    });

    return typingUsers;
};

module.exports.addInTyping = (typingUsers, id) => {
    let alreadyExists = false;

    typingUsers.forEach((item, index) => {
        if (item === id) {
            alreadyExists = true;
        }
    });

    if (!alreadyExists) {
        typingUsers.push(id);
    }
};

module.exports.removeFromTyping = (typingUsers, id) => {
    typingUsers.forEach((item, index) => {
        if (item === id) {
            typingUsers.splice(index, 1);
        }
    });
};