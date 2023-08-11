import { author } from './../models/index.js';

const authMiddleware = async (req, res, next) => {
    const result = await author.findOne({});
    req.user = result;
    next();
};

export default authMiddleware;
