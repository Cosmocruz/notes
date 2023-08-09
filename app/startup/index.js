import mongooseConnection from './mongooseConnection.js';

const init = async (app) => {
    await mongooseConnection();
};

export default init;
