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

	async init() {
		this.conversation = await this.data.read("messages");
		this.io.on("connection", (socket) => {
			console.log("a user connected");
			console.log(this.conversation);
			socket.emit("conversation", this.conversation);

			socket.on("message", (msg) => {
				socket.broadcast.emit("message", msg);
				console.log("message: " + msg);
			});

			socket.on("disconnect", (_) => {
				console.log("user disconnected");
			});
		});
	}
};
