import 'dotenv/config';
import express from 'express';

import { errorMiddleware } from './app/middlewares/index.js';

const app = express();

app.use(express.json());

app.all('/test', (req, res) => {
    res.status(200).send('Server is up...!');
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log('Server is up on port ', process.env.PORT);
});
