const userCtrl = require('@userCtrl')();
const User = require('@userModel');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


module.exports = (router) => {

    router.route('/users')
        .get(async(request, response, next) => {
            response.json(await User.getAllUsers());
        });

    router.route('/users/avatar')
        .post(upload.single('avatar'), async (request, response, next) => {
            await userCtrl.setAvatar(request.user._id, request.file)
        });

    router.route('/users/change/:field')
        .post(async (request, response, next) => {

            const updatedUser = await userCtrl.updateUser({
                user: request.user._id,
                field: request.params.field,
                value: request.body.field
            });

            if(updatedUser.error){
                response.status(500).send({ error: updatedUser.error })
            }
            else {
               response.json(updatedUser)
            }
        });

    router.route('/users/:id')
        .get(async (request, response, next) => {
            response.json(await User.getUserById(request.params.id))
        })
};
