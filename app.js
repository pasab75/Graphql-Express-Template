const express = require("express");
const { apolloExpress } = require("apollo-server");
const bodyParser = require("body-parser");
const { graphiqlExpress } = require("apollo-server");
const graphqlExpress = require("apollo-server-express");
const executableSchema = require("./models/executableSchema");
const PORT = 3000;
const app = express();

app.use(
    "/graphql",
    bodyParser.json(),
    apolloExpress({ schema: executableSchema })
);

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(PORT);

console.log(`Listening on port ${PORT}!`);
