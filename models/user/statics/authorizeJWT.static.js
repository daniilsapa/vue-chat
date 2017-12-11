
module.exports = function(payload, done) {

    // console.log('payload');
    // console.log(payload);
    // console.log('payload');

    const User = this;

    User.findOne({_id: payload.id}, (err, user) => {
        if (err) {
            return done(err)
        }
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })


};

