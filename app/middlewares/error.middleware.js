import ApiError from './../errors/api.error.js';

const errorMiddleware = (err, req, res, next) => {
    console.log(JSON.stringify(err, null, 4));
    console.log(err);

    let errRes = {};
    if (process.env.NODE_ENV === 'development') {
        errRes.stackTrace = err.stack;
        errRes.error = err;
    }

    if (err instanceof ApiError) {
        return res.status(err.status).send({
            ...errRes,
            timesamp: Date.now(),
            status: err.status,
            message: err.message,
        });
    }

    // mongoose cast error  / invalid object key
    if (err.name === 'CastError') {
        const message = `Invalid value ${err.value} for field ${err.path}!`;
        res.status(400).send({
            ...errRes,
            timestamp: Date.now(),
            status: 400,
            message,
        });
        return;
    }

    // mongosse duplicate error
    if (err.code === 11000) {
        const message = `error duplicate key ${err.keyValue[Object.keys(err.keyPattern)[0]]} for ${
            Object.keys(err.keyPattern)[0]
        } field`;
        res.status(400).send({
            ...errRes,
            timestamp: Date.now(),
            status: 400,
            message,
        });
        return;
    }

    //mongoose validation error handled
    if (err.name === 'ValidationError') {
        let message = '';

        for (const key in err.errors) {
            message += err.errors[key].message + ' ';
        }

        res.status(400).send({
            ...errRes,
            timestamp: Date.now(),
            status: 400,
            message,
        });
        return;
    }

    res.status(500).send({
        ...errRes,
        timestamp: Date.now(),
        status: 500,
        message: 'Some error occured. Please try again.',
    });
};

export default errorMiddleware;
