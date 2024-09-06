# GraphQL starter Project (Notes app): Introduction to GraphQL in Node.js using Apollo Server

## About the project
This Project is introduction to GraphQL and is meant for beginners who want to learn how to create a GraphQL server in Node.js using Apollo Server. It aims to explain the basics of GraphQL in NodeJS, gets you familiar the libraries, how to setup/run the server. 

The Project is modeled around simple Notes app where you will be able to use GraphQL operations like `Query` & `Mutation` to perform CRUD operations on notes.For simplicity and to center the focus in the GrapQL itself, we are not using any external database, instead we are using an array to store the notes (consider it an inmemory database).

By The end of this project you will be able to understand the basics of GraphQL, how to create a GraphQL server in Node.js using Apollo Server, how to define a schema using the gql tag, how to define resolvers(resolver functions) for the schema, and how to start the server.
You will be able to read all notes, read a single note, create a new note, update an existing note, and delete a note in the Apollo GraphQL server.
Keep in mind though these changes are not persistent as we are not using any database, so once you stop the server all the notes will be lost.

Hope you learn something new and enjoy the project.

### npm dependencies:
- @apollo/server"
- graphql-tag"

## About GraphQL
- GraphQL is a query language for APIs and a runtime for executing those queries by using a type system you define for your data.  GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data. The GraphQL API is composed of types and fields, often referred to as a schema. The schema defines the capabilities of the API and specifies how clients can request the data. Resolver functions are used to fetch the data for the fields in the schema.
Similar to GET, POST, PUT and DELETE in REST architecture GraphQL has its own set of operations like Query, Mutation and Subscription.
1. Query: Used to fetch data from the server.
2. Mutation: Used to write data to the server.
3. Subscription: Used to listen for changes to data.
4. Scalar types: Int, Float, String, Boolean, ID
5. Object types: Custom types that represent a group of fields.
6. Enum types: A special kind of scalar that is restricted to a particular set of values.
7. Interface types: An abstract type that includes a certain set of fields that a type must include.

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
1. Note: A type that represents a note with fields id, title, and content.
2. Query: A type that represents the queries that can be made to fetch data.

## Defining the resolvers
The Notes app will require following resolvers:
1. Note: Note Object type with fields id, title, description,isLiked,createdDate,
2. Query:Query Function to fetch all notes and a single note by id.
3. Mutation: Mutation functions to create, update, and delete a note.





