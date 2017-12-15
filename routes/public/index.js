const router = require('express').Router();
//IMPORTED MODELS
const Chat = require('@chatModel');
//IMPORTED CONTROLLERS
const userCtrl = require('@userCtrl')(),
      chatCtrl = require('@chatCtrl');

module.exports = () => {

    router.route('/check/:field')
        .post(async(request, response, next) => {
            userCtrl.getUserByCustomField(request.params.field, request.body.field)
                .then(user => {
                    if(user){
                        response.json({ result: true })
                    }
                    else{
                        response.json({ result: false })
                    }
                })
                .catch(error => {
                    response.status(500).send({})
                })
        });

    router.route('/check/chat/:field')
        .post(async(request, response, next) => {
            Chat.getChatByTitle(request.body.field, false)
                .then(user => {
                    if(user){
                        response.json({ result: true })
                    }
                    else{
                        response.json({ result: false })
                    }
                })
                .catch(error => {
                    response.status(500).send({})
                })
        });

    return router;
};