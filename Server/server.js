import express from 'express';

require('dotenv').config();
import cors from 'cors';
import initRoutes from './src/routes';
import generateDate from './src/utils/generateDate';
import generateCode from './src/utils/generateCode';
import connectDatabase from './src/config/connectDatabase';
const app = express();
console.log(generateCode("thành phố hồ chí minh"));
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
console.log("current date", generateDate());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

