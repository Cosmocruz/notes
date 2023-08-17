import ApiError from '../errors/api.error.js';
import { author } from './../models/index.js';

class Author {
    async getAuthors() {
        const authors = await author.find({});
        return authors;
    }

    async getAuthorbyEmail({ email }) {
        let result = await author.find({ email });
        return result;
    }

    async getAuthorById({ id }) {
        const authors = await author.findById(id).populate('notes');

        if (!authors) throw new ApiError(`Resource not found.`, 404);

        return authors;
    }

    async AddAuthor({ name, gender, email, dob, password }) {
        const result = await author.create({
            name,
            gender,
            dob,
            email,
            password,
        });

        return result;
    }
}

export default Author;
