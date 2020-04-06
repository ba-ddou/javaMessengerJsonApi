/*
 * Library for storing and editing data
 *
 *
 */

// Dependencies
var fs = require("fs");

// Write data to a file
exports.create = (file, data) => {
	return new Promise((resolve, reject) => {
		// Open the file for writing
		fs.open("./src/data/" + file + ".json", "wx", (err, fileDescriptor) => {
			if (!err && fileDescriptor) {
				// Convert data to a string
				var stringData = JSON.stringify(data);

				// Write to file and close it
				fs.writeFile(fileDescriptor, stringData, (err) => {
					if (!err) {
						fs.close(fileDescriptor, (err) => {
							if (!err) {
								resolve(true);
							} else {
								reject("Error closing new file");
							}
						});
					} else {
						reject("Error writing to new file");
					}
				});
			} else {
				reject("Could not create new file, it may already exist");
			}
		});
	});
};

// Read data from a file
exports.read = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile("./src/data/" + file + ".json", "utf8", (err, data) => {
			if (!err && data) {
				var parsedData = JSON.parse(data);
				resolve(parsedData);
			} else {
				reject(err);
			}
		});
	});
};

// Update data inside a file
exports.update = (file, data) => {
	return new Promise((resolve, reject) => {
		// Open the file for writing
		fs.open("./src/data/" + file + ".json", "r+", (err, fileDescriptor) => {
			if (!err && fileDescriptor) {
				var stringData = JSON.stringify(data);
				// Truncate the file
				fs.truncate(fileDescriptor, (err) => {
					if (!err) {
						// Write to the file and close it
						fs.writeFile(fileDescriptor, stringData, (err) => {
							if (!err) {
								fs.close(fileDescriptor, (err) => {
									if (!err) {
										resolve(true);
									} else reject("Error closing Existingfile");
								});
							} else {
								reject("Error writing to existing file");
							}
						});
					} else {
						reject("error truncating file");
					}
				});
			} else {
				reject(
					"could not open the file for updating, it might not exist"
				);
			}
		});
	});
};
// Delte a file
exports.delete = (dir, file) => {
	return new Promise((resolve, reject) => {
		// Unlink the file
		fs.unlink("./src/data/" + file + ".json", (err) => {
			if (!err) resolve(true);
			else reject("Error deleting the file");
		});
	});
};
