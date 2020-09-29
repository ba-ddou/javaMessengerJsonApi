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
			// socket.emit("conversation", this.conversation);
			// socket.emit("message", "first java socket message");
			// socket.emit("message", JSON.stringify({
			// 	from: "badou",
			// 	message: "what's up!!",
			// 	timestamp: "27/09/2020 19:18:35"
			// }));

			socket.on("message", (rawMsgObject) => {
				// let msgObject = JSON.parse(rawMsgObject);
				socket.broadcast.emit("message", rawMsgObject);
				console.log("message: " + rawMsgObject);
			});

			socket.on("disconnect", (_) => {
				console.log("user disconnected");
			});
		});
	}
};
