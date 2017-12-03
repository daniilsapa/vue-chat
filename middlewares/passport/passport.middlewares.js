const User = require('../../models/user/user.model');
const jwt = require('jsonwebtoken');

const jwtsecret = "mysecretkey";

module.exports = (passport, LocalStrategy, JwtStrategy, ExtractJwt) => {

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        User.authorize.bind(User)
        )
    );

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: jwtsecret
    };

    passport.use(new JwtStrategy(jwtOptions, User.authorizeJWT.bind(User)));

};