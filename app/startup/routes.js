import { authorRoutes, noteRoutes, authRoutes } from './../routes/index.js';

const appRoutes = (app) => {
    app.use('/author', authorRoutes);
    app.use('/note', noteRoutes);
    app.use('/auth', authRoutes);
};

export default appRoutes;
