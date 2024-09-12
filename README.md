# GraphQL starter Project (Notes app): Introduction to GraphQL in Node.js using Apollo Server

## About the project
This Project is introduction to GraphQL and is meant for beginners who want to learn how to create a GraphQL server in Node.js using Apollo Server. It aims to explain the basics of GraphQL in NodeJS, gets you familiar the libraries, how to setup/run the server. 

The Project is divided into two parts in two separate branches: starter and main. The starter bracnch has a very basic implementation of GraphQL server with a simple Query that returns a string. This is intended to just get your feet wet with GraphQL and understand the basics. Spend time to understand the code and different modules needed to create a GraphQL server.
The main branch has a real world application of GraphQL where we will be creating a Notes app API. It is built upon the foundation of the starter branch and extends it to a real world application. Instead of working with just a string that will be served by the Query, we will be working with a Notes object that has different fields like id, title, description, isLiked, createdDate, difficulty. We will be able to perform CRUD operations on notes using GraphQL operations like `Query` & `Mutation`.

The Project is modeled around simple Notes app where you will be able to use GraphQL operations like `Query` & `Mutation` to perform CRUD operations on notes.For simplicity and to center the focus in the GrapQL itself, we are not using any external database, instead we are using an array to store the notes (consider it an inmemory database).

By The end of this project you will be able to understand the basics of GraphQL, how to create a GraphQL server in Node.js using Apollo Server, how to define a schema using the gql tag, how to define resolvers(resolver functions) for the schema, and how to start the server.
You will be able to read all notes, read a single note, create a new note, update an existing note, and delete a note in the Apollo GraphQL server.
Keep in mind though these changes are not persistent as we are not using any database, so once you stop the server all the notes will be lost.

Hope you learn something new and enjoy the project.

### npm dependencies:
- @apollo/server"
- graphql-tag": this 

## About GraphQL
- GraphQL is a query language for APIs and a runtime for executing those queries by using a type system you define for your data.  GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data. The GraphQL API is composed of types and fields, often referred to as a schema. The schema defines the capabilities of the API and specifies how clients can request the data. Resolver functions are used to fetch the data for the fields in the schema.
Similar to GET, POST, PUT and DELETE in REST architecture GraphQL has its own set of operations like Query, Mutation and Subscription. These operations are built using the schema and resolvers. Resolvers are functions that define how the server should respond to a particular query or mutation. 
1. Query: Used to read data from the server.
2. Mutation: Used to write data to the server.
3. Subscription: Used to listen for changes to data.

## REST Vs GraphQL:
Both REST and GraphQL are used to build APIs that clients can use to interact with the server. However, there are some key differences between the two:
1. REST has a fixed set of endpoints that return a fixed set of data. In contrast, GraphQL allows clients to request only the data they need and nothing more.
2. REST APIs are resource-based, meaning that each endpoint represents a resource (e.g., /users, /posts). In contrast, GraphQL APIs are query-based, meaning that clients can request exactly the data they need using a single endpoint.
3. REST APIs use HTTP methods (GET, POST, PUT, DELETE) to interact with the server. In contrast, GraphQL APIs use a single HTTP method (POST) and a query language to interact with the server.
4. REST APIs have a fixed data structure that is defined by the server. In contrast, GraphQL APIs have a flexible data structure that is defined by the client.
5. REST APIs are stateless, meaning that each request is independent of the others. In contrast, GraphQL APIs can maintain state between requests using a feature called subscriptions.
6. REST APIs are easy to cache because each endpoint has a fixed URL. In contrast, GraphQL APIs are harder to cache because each query can be different.
7. REST APIs are easy to understand because they follow a standard pattern. In contrast, GraphQL APIs can be more complex because they are query-based.


## Why use GraphQL?
1. Flexibility: Clients can request only the data they need and nothing more, which can reduce the amount of data transferred over the network and improve performance.
2. Efficiency: Clients can request multiple resources in a single query, which can reduce the number of round trips to the server and improve performance.
3. Type safety: GraphQL APIs are strongly typed, meaning that the schema defines the types of the data that can be returned by the server. This can help prevent bugs and improve code quality.
4. Real-time updates: GraphQL APIs support subscriptions, which allow clients to listen for changes to data in real time. This can be useful for building real-time applications like chat apps or live dashboards.


## GraphQL Server(Apollo) in Node.js
- Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL schema. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source. Apollo Server works with any GraphQL schema, and it's compatible with all the GraphQL tooling, because Apollo Server is based on the JavaScript reference implementation for GraphQL.

## Steps to create a GraphQL server
1. Install the required dependencies:
```bash
npm install @apollo/server graphql-tag
```
"graphql-tag" is a template literal tag that parses GraphQL query strings into the standard GraphQL AST.This allows you to write queries directly in your JavaScript files without needing a .graphql file. It also enables syntax highlighting for your queries and thus makes them easier to read.

2. Create a new file called "server.js" and add the following code:
```javascript
import { ApolloServer } from 'apollo-server';
import { gql } from 'graphql-tag';
import { startStandaloneServer } from '@apollo/server/standalone';

```

// startStandaloneServer is used to start the server in standalone mode. It is useful when you want to start the server without using the ApolloServer constructor.
// In our

3. Define the schema using the gql tag:
```javascript
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
```

4. Define the resolvers for the schema:
   ```javascript
    const resolvers = {
      Query: {
          hello: () => 'Hellow  world! This is your First GraphQL query',
      },
  };
  ```


5. Create an instance of ApolloServer and start the server:
```javascript
// create instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const PORT = process.env.PORT || 4000;

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});
```

6. Run the server using the following command:
```bash
node server.js
```

## Understanding GraphQL API with real world application: Notes App API
The steps and introduction above should give you a good understanding of what is GraphQL and how you can set up and use in Node.js using Apollo Server. By following the implementations you should have a succesfully running GraphQL server . You should be able to run a Query which returns a string `Hellow  world! This is your First GraphQL query`. 
Once the basic concept is established , we can take the concept and apply it to the real world application. In our case we will apply it to a Notes application where we will be able to perform CRUD operations on notes. We will be able to read all notes, read a single note, create a new note, update an existing note, and delete a note in the Apollo GraphQL server. These are accomplished using the GraphQL operations like `Query` & `Mutation`.

## Defining the schema
The schema for the Notes app API will have the following types:
1. Note: A type that represents a note with different fields..
   - The note object has following fields and types:
     - id: ID!
     - title: String!
     - description: String!
     - isLiked: Boolean!
     - createdDate: String!
     - difficulty: Int! 

2. Query: A type that represents the queries that can be made to fetch data. We have two different queries:One that fetches all notes and another that fetches a single note by id.
3. Mutation: A type that represents the mutations that can be made to write data. We have 3 different mutations: create,update and delete.


## Defining the resolvers
Resolvers are functions that define how the server should respond to a particular query or mutation. In query resolvers , the function returns the data for the query. In mutation resolvers, the function writes the data to the server. Apart from query and mutation, graphql also has subscription resolvers which are used to listen for changes to data. This allows to subscribe to live changes in data .However it is a bit advanced topic and we will not cover in this project.
The Notes app will require following resolvers:
1. Query: Resolvers for fetching all notes and a single note.
2. Mutation: Resolvers for creating, updating, and deleting a note.

### Query
1. Get all notes: A query that returns all notes.
2. Get a single note: A query that returns a single note by id.

### Mutation
1. Create a note: A mutation that creates a new note.
2. Update a note: A mutation that updates an existing note by id.
3. Delete a note: A mutation that deletes a note by id.






