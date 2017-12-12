//Custom addictions
const passport = require('passport');
const ExpressPassport = require('express-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwt = require('jsonwebtoken');

const jwtsecret = "mysecretkey";

require('@passportMiddlewares')(passport, LocalStrategy, JwtStrategy, ExtractJwt);

const socketioJwt = require('socketio-jwt');


const publicRoutes = require('@publicRoutes')();
const privateRoutes = require('@privateRoutes')();

const auth = require('@authRoutes')(passport, jwt, jwtsecret);

module.exports = app => {
    app.use(passport.initialize());

    app.use('/auth', auth);
    app.use('/public', publicRoutes);
    app.use('/private', passport.authenticate('jwt', { session: false }), function(req, res, next){
        next();
    }, privateRoutes);

};

