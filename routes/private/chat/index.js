const chatCtrl = require('@chatCtrl');

module.exports = router => {

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
                response.status(200).json({result: 'OK'});
            }

        })

};