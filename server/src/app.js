//* Import dependencie
const express = require("express");
const http = require("http");
const logger = require("./logger/WinstonPlugin");

//* Intialize env veriables
const { config } = require("dotenv");
config();

//* Setup the express server
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

//* Import middlewares into express
app.use(express.json({ limit: "10mb" }));

//* Start the server
server.listen(port, () => {
  logger.info(`Server started, PORT -> ${port}`);
});
