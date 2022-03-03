const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema =require('./schema/schema')
const cors = require('cors')

const connectDB = require('./config/db')
const app = express()

app.use(cors())
connectDB()




app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

//allow cros-origin requests



app.listen(5000, ()=> {
    console.log('listening on port 5000');
})