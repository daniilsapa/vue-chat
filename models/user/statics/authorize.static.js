module.exports = function(data, password, done) {

    const User = this;


    User.findOne({$or: [{username: data}, {email: data}]}, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user || !user.checkPassword(password)) {
            return done(null, false, {message: 'Incorrect password or user does not exist!'});
        }

        if(user.isBanned === true || user.isDeleted === true){
            reject({code: 444, message: 'Permission denied'})
        }

        return done(null, user);
    });

};