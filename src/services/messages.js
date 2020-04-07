/*
 *
 * Authentication service
 *
 *
 */

var jwt = require("jsonwebtoken");

module.exports = class MessagesService {
	constructor(container) {
		//get config object from typedi
		this.config = container.get("config");
		//get data object frm typedi
		this.data = container.get("data");

		this.io = container.get("io");
		this.sockets = [];

		this.init();
	}

	init() {
		this.io.on("connection", (socket) => {
			this.sockets.push(socket);
			console.log("a user connected");
		});
	}
};
