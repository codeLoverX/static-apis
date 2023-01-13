// express
const express = require('express');
const PORT = 3000;
const app = express();
const fs = require('fs');


// const data2 = JSON.parse(fs.readFileSync('db/db.js', 'utf8'));
// console.log({data2})
const data2 = require('./json-graphql-server/db.js')
console.log({data2})

// jsonServer
const jsonServer = require('json-server')
app.use('/api', jsonServer.router('db/db.js'));

// jsonGraphql
const jsonGraphqlExpress = require("json-graphql-server").default;


const data = {
    posts: [
        { id: 1, title: "Lorem Ipsum", views: 254, user_id: 123 },
        { id: 2, title: "Sic Dolor amet", views: 65, user_id: 456 },
    ],
    users: [
        { id: 123, name: "John Doe" },
        { id: 456, name: "Jane Doe" }
    ],
    comments: [
        { id: 987, post_id: 1, body: "Consectetur adipiscing elit", date: new Date('2017-07-03') },
        { id: 995, post_id: 1, body: "Nam molestie pellentesque dui", date: new Date('2017-08-17') }
    ]
    // posts: [
    //     { id: 1, title: "Lorem Ipsum", views: 254, user_id: 123 },
    //     { id: 2, title: "Sic Dolor amet", views: 65, user_id: 456 },
    // ],
    // users: [
    //     { id: 123, name: "John Doe" },
    //     { id: 456, name: "Jane Doe" }
    // ],
    // comments: [
    //     { id: 987, post_id: 1, body: "Consectetur adipiscing elit", date: new Date('2017-07-03') },
    //     { id: 995, post_id: 1, body: "Nam molestie pellentesque dui", date: new Date('2017-08-17') }
    // ]
};
app.use('/graphql', jsonGraphqlExpress(data));

app.listen(PORT, () => {
    console.log('JSON Server is running')
})


// Export the Server API
// module.exports = app