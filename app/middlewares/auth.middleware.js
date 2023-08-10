import { author } from './../models/index.js';

const authMiddleware = async (req, res, next) => {
    const result = await author.findOne({});
    req.author = result;
};

export default authMiddleware;
