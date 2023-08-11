import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { Note } from './../services/index.js';

const router = Router();

router.get('/', async (req, res) => {
    const note = new Note();
    const result = note.getAllNotes();
    res.status(200).send(result);
});

router.post('/', [authMiddleware], async (req, res) => {
    const { description, tags, title } = req.body;

    const note = new Note();
    const result = await note.createNote({
        author: req.user._id,
        description,
        tags,
        title,
    });

    res.status(201).send(result);
});

export default router;
