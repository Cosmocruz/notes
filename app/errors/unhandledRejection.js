// to handle, unhandled promise rejection outside express
process.on('unhandledRejection', (err) => {
    console.log({ error: err.name, message: err.message });
    // shuting down is optional
    server.close(() => {
        console.log('>>> Unhandled rejection occured! Shutting down...');
        process.exit(1);
    });
});
