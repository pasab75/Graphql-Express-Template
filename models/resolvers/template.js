import { find, filter } from "lodash";

const authors = [
    { id: 1, firstName: "Tom", lastName: "Coleman" },
    { id: 2, firstName: "Sashko", lastName: "Stubailo" },
    { id: 3, firstName: "Mikhail", lastName: "Novikov" }
];
const posts = [
    { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
    { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 },
    { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
    { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 }
];

const Query = {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id })
};

const Mutation = {
    upvotePost: (_, { postId }) => {
        const post = find(posts, { id: postId });
        if (!post) {
            throw new Error(`Couldn't find post with id ${postId}`);
        }
        post.votes += 1;
        return post;
    }
};

const Author = {
    posts: (author) => filter(posts, { authorId: author.id })
};

const Post = {
    author: (post) => find(authors, { id: post.authorId })
};

/* 
    Every {name}.js file in the resolvers folder needs to export an object 
    with at LEAST the following properties:
        Query 
        Mutation
    These will be merged to allow our resolvers to make one executable schema.
    I suggest having a matching {name}.js in the schemas folder as well (for clarity)
    The Query and Mutation function names need to match the names in the schema {name}.js file
    Additional properties will be appended to allow graphql to resolve functions correctly
    As such, these properties need to NEVER conflict in name
*/
module.exports = {
    Query,
    Mutation,
    Author,
    Post
};
