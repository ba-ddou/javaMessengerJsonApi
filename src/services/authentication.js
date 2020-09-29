/*
 *
 * Authentication service
 *
 *
 */

var jwt = require("jsonwebtoken");

module.exports = class AuthenticationService {
	constructor(container) {
		//get config object from typedi
		this.config = container.get("config");
		//get data object frm typedi
		this.data = container.get("data");
	}

	//Generate user token | requires username and password
	post = async (payload) => {
		console.log("AuthenticationService -> post -> payload", payload);
		var { username, password } = payload;
		// console.log("AuthenticationService -> post -> password", password);
		// console.log("AuthenticationService -> post -> username", username);

		if (username && password) {
			// retreive admin object from the database
			let data = await this.data.read("users");
			let userObject = data.find((user) => user.username == username);
			if (userObject) {
				// compare received password and stored password
				if (password == userObject.password) {
					// generate JWT token
					let token = jwt.sign(
						{
							username,
						},
						this.config.jwtPrivateKey
					);
					return [token, false, 200];
				} else {
					return [
						false,
						"invalid username-password combination",
						403,
					];
				}
			} else {
				return [false, "user not found", 404];
			}
		} else {
			return [false, "missing username or password", 400];
		}
	};
};
