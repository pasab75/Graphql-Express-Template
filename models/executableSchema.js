const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const { combineTypeDefs, combineResolvers } = require("../utils/combineSchema");
const resolverDirectory = path.join(__dirname, `resolvers`);
const typeDefDirectory = path.join(__dirname, `typeDefs`);

const typeDefs = combineTypeDefs(typeDefDirectory);
const resolvers = combineResolvers(resolverDirectory);

module.exports = makeExecutableSchema({ typeDefs, resolvers });
