# An Express Graphql Template

To use this project, first clone the project, npm install and type npm start.
This will start the graphql and graphiql endpoints on Port 3000.

## TypeDefs Files

Deposit all typeDef files in the typeDefs folder, under models
Ensure no two typeDef files have the same name.
Use the typeDefs template as an example, but all these files should export the following: 

```javascript
module.exports = {
    Types, //type String
    Query, //Type String
    Mutation //Type String
}
```

## Resolver Files

Deposit the resolver files in the resolvers folder, under models
Ensure that these do not have namespace conflicts, the deepAssign will attempt to help
but can not guarentee this works.  Use the resolver template.js as an example but all resolvers need to export the following:

```javascript
module.exports ={
    Query, // Object that has functions as keys, matches names from typeDefs file
    Mutation, // Object that has functions as keys, matches names from typeDefs file
    [...Others] //Functions that Query and Mutations subfunctions need
}
```

## Run the server

npm start

## Licensing

MIT License

Copyright (c) 2017 Paul Matthew Sabatino

See License File