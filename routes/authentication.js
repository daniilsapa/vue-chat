const express = require('express');
const router = express.Router();

const User = require('@userModel');
const Chat = require('@chatModel');

module.exports = (passport, jwt, jwtsecret) => {

    const login = async(request, response, next) => {

        await passport.authenticate('local', function (err, user) {

            if(!user && request.userCreated){
                response.status(401).send({msg: "The account was created successfully, but the automatic login failed"});
            }
            if (!user) {
                response.status(401).send({msg: "Login failed"});
            }
            else {

                //--payload - информация которую мы храним в токене и можем из него получать
                const payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                };
                const token = jwt.sign(payload, jwtsecret); //здесь создается JWT

                response.status(200).send({user: user.username, token: 'JWT ' + token});

            }

        })(request, response, next);
    };

    const signup = async(request, response, next) => {

        try{

            const user = await User.addUser(request.body);
            console.log(user);


            let chats = await Chat.getAllChats();

            chats = chats.map((item, index) => {

                return item._id

            });

            await User.setAvailableChats(user._id, chats);
            await Chat.setMemberForManyChats(chats, user._id);

            request.userCreated = true;
            next();

        }
        catch (err) {
            console.log(err);
            response.status(500).send(err);
        }

    };

    const authorize =  async(request, response, next) => {

        await passport.authenticate('jwt', function (err, user) {
            if (user) {
                response.status(200).send("hello " + user.username);
            } else {
                response.status(404).send("No such user");
                console.log("err", user)
            }
        } )(request, response, next)

    };

    router.post('/login', login);

    router.post('/user', signup, login);

    router.get('/custom', authorize);

    return router;

};



