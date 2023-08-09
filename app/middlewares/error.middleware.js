const errorMiddleware = (err, req, res, next) => {
    // error not handled poperly yet
    res.status(500).send({
        error: 500,
        message: 'something went wrong',
    });
};

export default errorMiddleware;
