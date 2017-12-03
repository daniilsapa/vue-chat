"use strict";

module.exports = function (data) {

		const User = this;

		return new Promise(function(resolve, reject) {

				User.findOne({$or: [{username: data}, {email: data}]}, (error, result) => {

						if (error) {
								reject(error);
						}
						else if (result) {
								resolve(result, 200);
						}
						else {
								resolve(null);
						}

				})

		});

};