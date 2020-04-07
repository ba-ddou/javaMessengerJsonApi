/*
 * App entry point
 *
 *
 */

const Config = require("./config");
const Api = require("./api");
const Data = require("./data");
const Container = require("typedi").Container;

const MessagesService = require("./services/messages");

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

Container.set("io", io);
// instantiate configs object
const config = new Config(); // This is a normal object instantiation
// add the config object to typedi's container
Container.set("config", config); // any class in the container.get() instantiation heirarchy
// can retrieve the config object using container.get("config").

const data = Container.get(Data); // the purpose of object instantiation with Container.get()
// is to inject dependencies throught the class constructor.

Container.set("data", data); // any class in the container.get() instantiation heirarchy
// can retrieve the data object using container.get("data").

const api = Container.get(Api);
const messagesService = Container.get(MessagesService);

app.use(express.json());
app.use("/", api.router);

http.listen(config.port, (_) =>
	console.log(`server is listening on port ${config.port}`)
);
