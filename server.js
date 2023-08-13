import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorMiddleware } from './app/middlewares/index.js';
import init from './app/startup/index.js';

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    //exposedHeaders: 'header_Name',
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// app initiater
await init(app);

// ping route
app.all('/ping', (req, res) => {
    res.status(200).send('Server is up...!');
});
//all route handler
app.all('*', (req, res) => {
    res.status(404).send({ message: 'resource not found', status: 404 });
});

// error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log('>> Server runnin on port ', process.env.PORT);
});
