import { Router } from 'express';
import { Note } from './../services/index.js';

const router = Router();

router.get('/', async (req, res) => {
    const note = new Note();
    const result = note.getAllNotes();
    res.status(200).send(result);
});

router.post('/', async (req, res) => {
    const { description, tags, title } = req.body;

    const note = new Note();
    const result = await note.createNote({
        author: req.use._id,
        description,
        tags,
        title,
    });

    res.status(201).send(result);
});

export default router;
