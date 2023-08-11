import { authorRoutes, noteRoutes } from './../routes/index.js';

const appRoutes = (app) => {
    app.use('/author', authorRoutes);
    app.use('/note', noteRoutes);
};

export default appRoutes;
