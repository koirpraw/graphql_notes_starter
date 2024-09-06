
import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';


import { startStandaloneServer } from '@apollo/server/standalone';

// Define the schema
const typeDefs = gql`
type Query{
    hello:String

}
`

// Define resolvers
const resolvers = {
    Query: {
        hello: () => 'Hellow  world! This is your First GraphQL query'
    }
}

// create instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const PORT = process.env.PORT || 4000;

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
})

console.log(`server currently running on ${url}`);