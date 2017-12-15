const chatCtrl = require('@chatCtrl'),
      Chat = require('@chatModel');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

module.exports = router => {

    router.route('/chats/available')
        .post(async (request, response, next) => {
            const chats = await chatCtrl.getChatByArray(request.body);

            response.status(200).json(chats);
        });

    router.route('/chats')
        .post(async (request, response, next) => {
            const chat = await chatCtrl.createChat(request.body);

            if(chat.error){
                response.status(500).json(chat.error);
            }
            else {
                response.status(200).json(chat);
            }
        });

    router.route('/chats/:id')
        .get(async (request, response, next) => {
            const chat = await chatCtrl.getChatById(request.params.id, true);

            if(chat.error){
                response.status(500).json(chat.error);
            }
            else {
                response.status(200).json(chat);
            }
        });

    router.route('/chats/change/:id/title')
        .post(async (request, response, next) => {

            const chat = await chatCtrl.setTitle(request.params.id, request.body.field);

            if(chat.error){
                console.log(chat.error);
                response.status(500).json(chat.error);
            }
            else {
                response.status(200).json(chat);
            }
        });

    router.route('/chats/cover/:id')
        .post(upload.single('cover'), async (request, response, next) => {
            await chatCtrl.setCover(request.params.id, request.file)
        });
};