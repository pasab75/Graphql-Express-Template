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

module.exports = {
    Types,
    Query,
    Mutation
};
