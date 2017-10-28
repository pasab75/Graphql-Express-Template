const Types = `
    type Author {
        id: Int!
        firstName: String
        lastName: String
        posts: [Post] # the list of Posts by this author
    }
    type Post {
        id: Int!
        title: String
        author: Author
        votes: Int
    }
`;

const Query = `
    posts: [Post]
    author(id: Int!): Author
`;

const Mutation = `
    upvotePost (
        postId: Int!
    ): Post
`;

/* 
    Every {name}.js file in the schema folder needs to export an object 
    with the following properties (and only these properties):
        Types
        Query
        Mutation
    These will be merged to allow our schema to make one executable schema.
    I suggest having a matching {name}.js in the resolver folder as well (for clarity)
    The Query and Mutation function names need to match the names in the resolver {name}.js file
    As such, these properties need to NEVER conflict in name
*/

module.exports = {
    Types,
    Query,
    Mutation
};
