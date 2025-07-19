import express from 'express';

import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import initRoutes from './src/routes/index.js';

import connectDatabase from './src/config/connectDatabase.js';
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', (req, res) => {
//     res.send('Hello World');
// }
// );
initRoutes(app);
connectDatabase();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

