import ApiError from './../errors/api.error.js';

const errorMiddleware = (err, req, res, next) => {
    // error not handled poperly yet

    let errRes = {};

    if (process.env.NODE_ENV === 'development') {
        errRes.stackTrace = err.stack;
    }

    if (err instanceof ApiError) {
        return res.status(err.status).send({
            ...errRes,
            timesamp: Date.now(),
            status: err.status,
            message: err.message,
        });
    }

    console.log(JSON.stringify(err, null, 4));
    console.log(err);

    res.status(500).send({
        ...errRes,
        timestamp: Date.now(),
        status: 500,
        message: 'Some error occured. Please try again.',
    });
};

export default errorMiddleware;
