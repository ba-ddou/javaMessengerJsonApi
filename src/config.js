/*
 *
 *
 * application configs
 *
 */

/*
 *
 * Configs Object
 *
 */

module.exports = class Config {
	// construct a js configs object
	constructor() {
		this.port = process.env.PORT || 4500;
		this.jwtPrivateKey = "AhQ72hj8nDj";
	}
};
