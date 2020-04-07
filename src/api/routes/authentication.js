/*
 *
 * authentication route
 *
 */

const express = require("express");
const Service = require("../../services/authentication");

module.exports = class Authentication {
	constructor(container) {
		//create new express route
		this.router = express.Router();
		//get config object from typedi
		this.config = container.get("config");
		//create service instance and add it to typedi's container
		this.service = container.get(Service);
		//get data object frm typedi
		this.data = container.get("data");

		//attach get handler
		this.router.post("/", this.post);
	}

	//post handler | authentication
	post = async (req, res) => {
		// pass the request's body to the service's POST handler
		var [token, err, statusCode] = await this.service.post(req.body);
		res.status(statusCode);
		if (token) {
			let messages = await this.data.read("messages");
			res.end(JSON.stringify({ token, messages }));
		} else {
			res.end(JSON.stringify({ err }));
		}
	};
};
