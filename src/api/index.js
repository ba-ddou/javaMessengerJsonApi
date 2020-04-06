/*
 *
 * Api entry point | instantiate all api routes
 *
 */

const express = require("express");
const Authentication = require("./routes/authentication");

module.exports = class Api {
	constructor(container) {
		this.router = express.Router();
		this.authentication = container.get(Authentication);

		this.router.use("/authentication", this.authentication.router);
	}
};
