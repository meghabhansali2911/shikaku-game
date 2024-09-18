module.exports = (app) => {
    app.use('/vehicles', require("./apiRoutes"));
}