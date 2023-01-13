// express
const express = require('express');
const PORT = 3000;
const app = express();
const JSON_SERVER_FILE = './json-server/db.json'
const JSON_GRAPHQL_SERVER_FILE = './json-graphql-server/db.js'

// MAPPINGS
const json_server_schema = require(JSON_SERVER_FILE)
const json_graphql_server_schema = require(JSON_GRAPHQL_SERVER_FILE)
app.get('/', (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.json({
        fullUrl,
        gql: {
            schema: `${fullUrl}gql`,
            server: `${fullUrl}grapqhl`
        },
        rest: {
            schema: `${fullUrl}rest`,
            server: `${fullUrl}api`
        }
    })
});
app.get('/gql', (req, res) => {
    res.json({
        ...json_graphql_server_schema
    })
});
app.get('/rest', (req, res) => {
    res.json({
        ...json_server_schema
    })
});

// jsonServer
const jsonServer = require('json-server')
app.use('/api', jsonServer.router(JSON_SERVER_FILE));

// jsonGraphql
const jsonGraphqlExpress = require("json-graphql-server").default;
app.use('/graphql', jsonGraphqlExpress(require(JSON_GRAPHQL_SERVER_FILE)));
app.listen(PORT, () => {
    console.log('JSON Server is running')
})


// Export the Server API
// module.exports = app