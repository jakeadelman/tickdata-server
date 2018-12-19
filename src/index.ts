import 'reflect-metadata'
import {GraphQLServer} from 'graphql-yoga'
import {resolvers} from './resolvers'
import {createConnection} from 'typeorm'
import * as path from 'path'

const cors = require('cors')

// merge graphql schemas
const mergeGraphqlSchemas = require('merge-graphql-schemas')
const fileLoader = mergeGraphqlSchemas.fileLoader
const mergeTypes = mergeGraphqlSchemas.mergeTypes

const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, './schemaTypes/*.graphql'), {all: true})
)

// create graphql server and connect
const server = new GraphQLServer({typeDefs, resolvers})
server.use(cors())

createConnection().then(() => {
  server.start(() => console.log(`Server is running on localhost:4000`))
})
