const userCtrl = require('@userCtrl')();
const User = require('@userModel');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


module.exports = (router) => {
    router.route('/users/avatar')
        .post(upload.single('avatar'), async (request, response, next) => {
            //console.log(request.user);

            await userCtrl.setAvatar(request.user._id, request.file)

        });

    router.route('/users')
        .get(async(request, response, next) => {
            response.json(await User.getAllUsers());
        })
};
