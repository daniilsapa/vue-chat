const router = require('express').Router();

module.exports = () => {

    require('./chat')(router);
    require('./notifications')(router);
    require('./user/users')(router);

    return router;

};