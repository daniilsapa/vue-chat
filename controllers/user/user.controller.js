"use strict";

const  User = require('../../models/user/user.model');
const fs = require('fs');

module.exports = function () {



	return {
		usersByArray: 	usersByArray,
		deleteUser: 	deleteUser,
		updateUser: 	updateUser,
		customFind: 	customFind,

        getUsers: 		getUsers,
		addUser: 		addUser,
		logIn: 			logIn,

        getUserByToken: getUserByToken,
        getUserById: require('./methods/getUserById.method'),

        setAvatar: require('./methods/setAvatar.method')

	};

};

const addUser = async request => {

    try {
        const result = await User.addUser(request.body);
        return result;
    }
    catch (error) {
        return {error};
    }

};

const getUsers = request => {

    return new Promise((resolve, reject) => {

        User.getUsers(request.params.id, null)
            .then(resolve, reject);

    });

};



const getUserByToken = token => {

    return new Promise((resolve, reject) => {

        User.getUserByToken(token)
            .then(resolve, reject);

    });

};

const deleteUser = (request) => {

    return new Promise((resolve, reject) => {

        User.deleteUser(request.params.id)
            .then(resolve, reject);

    });


};

const logIn = (request) => {

    return new Promise((resolve, reject) => {

        User.authorize(request.body.data, request.body.password)
            .then(resolve, reject);

    });
    
};


const updateUser = (request) => {

    if(!request.params.id) {
        console.log(request.authorizationConfirmed);
        request.params.id = request.authorizationConfirmed._id;
    }

    return new Promise((resolve, reject) => {

        User.updateUser(request.body, request.params.id)
            .then(resolve, reject);

    });


};

const customFind = (token, searchObj) => {

    return new Promise (function (resolve, reject) {

        User.customFind(token, searchObj)
            .then(resolve, reject);

    });

};

const usersByArray = (request) => {

	return new Promise((resolve, reject) => {

        User.getUsers(null, request.body)
            .then(resolve, reject);

	});

};

