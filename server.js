import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorMiddleware } from './app/middlewares/index.js';
import init from './app/startup/index.js';



// to handle, unhandled  exception
process.on('uncaughtException', (err) => {
    console.log({ error: err.name, message: err.message });
    // shut down is compulsory because app is in dirty state
   // server.close(() => {
        console.log('>>> Ununcaught exception occured! Shutting down...');
        process.exit(1);
    //});
});


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

const server = app.listen(process.env.PORT, () => {
    console.log('>> Server runnin on port ', process.env.PORT);
});

// to handle, unhandled promise rejection outside express
process.on('unhandledRejection', (err) => {
    console.log({ error: err.name, message: err.message });
    // shuting down is optional
    server.close(() => {
        console.log('>>> Unhandled rejection occured! Shutting down...');
        process.exit(1);
    });
});

