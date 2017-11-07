const fs = require("fs");
const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const schemas = [];
const resolvers = [];
const logger = (e) => {
    console.error(e);
};
const deepAssign = require("../utils/deepAssign");
const resolverDirectory = path.join(__dirname, `resolvers`);
const schemaDirectory = path.join(__dirname, `schemas`);

const recursiveLoad = (directory, array) => {
    fs.readdirSync(directory).map((file) => {
        if (file.includes(".js"))
            array.push(require(path.join(directory, file)));
        else if (fs.statSync(directory + file).isDirectory())
            recursiveLoad(path.join(directory, file), array);
    });
};

recursiveLoad(resolverDirectory, resolvers);
recursiveLoad(schemaDirectory, schemas);

let typeDefString = `
    `;
let queryString = `
    type Query {
    `;
let mutationString = `
    type Mutation {
    `;

schemas.forEach((schema) => {
    typeDefString += `${schema.Types} \n`;
    queryString += `${schema.Query} \n`;
    mutationString += `${schema.Mutation} \n`;
});

queryString += `} \n`;
mutationString += `} \n`;
// we should be done playing with the schemas here, they should be formatted correctly
const typeDefs = typeDefString + queryString + mutationString;

const finalResolver = {};
resolvers.map((resolver, index) => {
    deepAssign(finalResolver, resolver);
});

//console.log(`schema: ${typeDefs}`);
//console.log(`resolvers: ${finalResolver}`);

module.exports = makeExecutableSchema({ typeDefs, resolvers: finalResolver });
