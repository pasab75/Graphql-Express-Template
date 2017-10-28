const fs = require("fs");
const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const schemas = [];
const resolvers = [];

const recursiveLoad = (directory, array) => {
    fs.readdirSync(directory).forEach((file) => {
        if (file.includes(".js")) array.push(require(file));
        else if (fs.statSync(directory + file).isDirectory())
            recursiveLoad(path.join(directory, file), array);
    });
};

recursiveLoad("./resolvers", resolvers);
recursiveLoad("./schemas", schemas);
