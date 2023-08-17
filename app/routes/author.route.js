import { Router } from 'express';
import moment from 'moment';
import { TIME_FORMAT } from '../constants/index.js';
import { Author } from './../services/index.js';

const router = Router();

router.get('/', async (req, res) => {
    const author = new Author();
    const result = await author.getAuthors();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const author = new Author();
    const result = await author.getAuthorById({ id });

    res.send(result);
});

router.post('/', async (req, res) => {
    const { name, dob, email, gender, password } = req.body;

    const author = new Author();
    const result = await author.AddAuthor({
        name,
        dob: moment(dob, TIME_FORMAT).toDate(),
        email,
        gender,
        password,
    });
    res.status(201).send(result);
});

export default router;
