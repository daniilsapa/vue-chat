const notificationCtrl = require('@notificationCtrl');
const User = require('@userModel');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


module.exports = (router) => {
    router.route('/notifications/create')
        .post(async(request, response, next) => {

            notificationCtrl.createNotification(request.body);

        });

    router.route('/notifications/:id/accept')
        .post(async(request, response, next) => {
            try{
                const notification = await notificationCtrl.acceptNotification(request.body);
                response.json(notification);
            }
            catch(e) {
                console.log('error', e);
                response.status(500).send({});
            }
        });

    router.route('/notifications/:id/reject')
        .post(async(request, response, next) => {

            response.json(await notificationCtrl.rejectNotification(request.body));

        });
};
