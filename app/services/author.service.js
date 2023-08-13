import ApiError from '../errors/api.error.js';
import { author } from './../models/index.js';

class Author {
    async getAuthors() {
        const authors = await author.find({});
        return authors;
    }

    async getAuthorById({ id }) {
        const authors = await author.findById(id).populate('notes');

        if (!authors) throw new ApiError(`Resource not found.`, 404);

        return authors;
    }

    async AddAuthor({ name, gender, email, dob }) {
        const result = await author.create({
            name,
            gender,
            dob,
            email,
        });

        return result;
    }
}

export default Author;
