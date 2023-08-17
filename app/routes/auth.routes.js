import { Router } from 'express';
import { Author } from './../services/index.js';
import ApiError from '../errors/api.error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const author = new Author();
    const result = await author.getAuthorbyEmail({ email });

    if (!result.length > 0) throw ApiError('user not found', 404);

    let isValid = await bcrypt.compare(password, result[0].password);

    if (isValid) {
        const token = jwt.sign({ id: result[0]._id }, process.env.SECRET_STR, {
            expiresIn: process.env.TOKEN_EXP,
        });

        const refreshToken = jwt.sign({ id: result[0]._id }, process.env.SECRET_STR, {
            expiresIn: process.env.TOKEN_EXP,
        });

        return res.status(200).send({
            token,
            refreshToken,
        });
    }

    throw new ApiError('Invalid Credentials', 400);
});

export default router;
