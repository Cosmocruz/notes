import ApiError from '../errors/api.error.js';
import { note } from './../models/index.js';

class Note {
    async createNote({ title, description, tags, author }) {
        const result = await note.create({ title, description, tags, author });
        return result;
    }

    async getAllNotes() {
        const result = await note.find({});
        return result;
    }

    async getNoteById({ id }) {
        const result = await note.findById(id).populate({ path: 'author', select: 'name dob -_id' });
        if (!result) throw new ApiError(`Resource not found.`, 404);
        return result;
    }
}

export default Note;
