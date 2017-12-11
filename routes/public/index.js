const router = require('express').Router();

const userCtrl = require('@userCtrl');

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

    return router;
};