import mongooseConnection from './mongooseConnection.js';
import appRoutes from './routes.js';

const init = async (app) => {
    appRoutes(app);
    await mongooseConnection();
};

export default init;
