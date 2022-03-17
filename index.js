const express = require('express');
const app = express();

const port = process.env.PORT || 7777;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

module.exports = server;