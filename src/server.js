import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import './db.js';

const app = express();
const port = 4001;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});