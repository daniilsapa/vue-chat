const router = require('express').Router();

module.exports = () => {

    require('./chat')(router);
    require('./user/users')(router);

    return router;

};