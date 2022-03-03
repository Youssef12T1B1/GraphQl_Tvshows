const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema =require('./schema/schema')

const connectDB = require('./config/db')

connectDB()


const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))




app.listen(3000, ()=> {
    console.log('listening on port 3000');
})