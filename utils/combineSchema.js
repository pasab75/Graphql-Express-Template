const fs = require("fs");
const path = require("path");
const deepAssign = require("./deepAssign");

const recursiveLoad = (directory, array) => {
    fs.readdirSync(directory).map((file) => {
        if (file.includes(".js"))
            array.push(require(path.join(directory, file)));
        else if (fs.statSync(directory + file).isDirectory())
            recursiveLoad(path.join(directory, file), array);
    });
};

function combineTypeDefs(typeDefDirectory) {
    const schemas = [];
    recursiveLoad(typeDefDirectory, schemas);
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
    return typeDefString + queryString + mutationString;
}

function combineResolvers(resolverDirectory) {
    const resolvers = [];
    recursiveLoad(resolverDirectory, resolvers);
    const finalResolver = {};
    resolvers.map((resolver, index) => {
        deepAssign(finalResolver, resolver);
    });

    return finalResolver;
}

module.exports = {
    combineTypeDefs,
    combineResolvers
};
