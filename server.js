// express
const express = require('express');
const PORT = 3000;
const app = express();
const fs = require('fs');

// jsonServer
const jsonServer = require('json-server')
app.use('/api', jsonServer.router('json-server/db.js'));

// jsonGraphql
const jsonGraphqlExpress = require("json-graphql-server").default;
app.use('/graphql', jsonGraphqlExpress(require('./json-graphql-server/db.js')));

app.listen(PORT, () => {
    console.log('JSON Server is running')
})


// Export the Server API
// module.exports = app