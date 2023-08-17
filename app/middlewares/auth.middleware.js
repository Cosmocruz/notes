import jwt from 'jsonwebtoken';
import { author } from './../models/index.js';
import ApiError from '../errors/api.error.js';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token && token.startsWith('bearer')) {
        let decoded;

        try {
            decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_STR);
        } catch (e) {
            throw new ApiError('invalid token', 401);
        }

        const result = await author.findById(decoded.id).select('-password');
        req.user = result();
        next();
    }
};

export default authMiddleware;
