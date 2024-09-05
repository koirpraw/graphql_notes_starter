
import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';


import { startStandaloneServer } from '@apollo/server/standalone';

// Define the schema
const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    description: String!
    isLiked: Boolean!
    createdDate: String!
    difficulty: Int!
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }

  type Mutation {
    addNote(title: String!, description: String!, isLiked: Boolean!, createdDate: String!, difficulty: Int!): Note
    deleteNote(id: ID!): Note
    updateNote(id:ID!,title: String, description: String, isLiked: Boolean, createdDate: String, difficulty: Int):Note
  }
`;

// In-memory database
const notes = [
    {
        id: "1",
        title: "Note 1",
        description: "This is note 1",
        isLiked: true,
        createdDate: "2022-01-01",
        difficulty: 3
    },
    {
        id: "2",
        title: "Note 2",
        description: "This is note 2",
        isLiked: false,
        createdDate: "2022-01-02",
        difficulty: 2
    },
    {
        id: "3",
        title: "Note 3",
        description: "This is note 3",
        isLiked: true,
        createdDate: "2022-01-03",
        difficulty: 1
    }
];
let idCounter = 4;

// Define resolvers
const resolvers = {
    Query: {
        notes: () => notes,
        note: (_, { id }) => notes.find(note => note.id === id),
    },
    Mutation: {
        addNote: (_, { title, description, isLiked, createdDate, difficulty }) => {
            const newNote = {
                id: String(idCounter++),
                title,
                description,
                isLiked,
                createdDate,
                difficulty
            };
            notes.push(newNote);
            return newNote;
        },
        updateNote: (_, { id, title, description, isLiked, createdDate, difficulty }) => {
            const noteIndex = notes.findIndex(note => note.id === id);
            if (noteIndex === -1) return null;

            const updatedNote = {
                ...notes[noteIndex],
                title: title !== undefined ? title : notes[noteIndex].title,
                description: description !== undefined ? description : notes[noteIndex].description,
                isLiked: isLiked !== undefined ? isLiked : notes[noteIndex].isLiked,
                createdDate: createdDate !== undefined ? createdDate : notes[noteIndex].createdDate,
                difficulty: difficulty !== undefined ? difficulty : notes[noteIndex].difficulty,

            }
            notes[noteIndex] = updatedNote;
            return updatedNote;


        },
        deleteNote: (_, { id }) => {
            const index = notes.findIndex(note => note.id === id);
            if (index === -1) return null;
            const [deletedNote] = notes.splice(index, 1);
            return deletedNote;
        }
    }
};

// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const PORT = process.env.PORT || 4000;

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});


console.log(`Server running at ${url}`);
