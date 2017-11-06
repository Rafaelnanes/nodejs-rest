module.exports = function (app) {
    app.use(function (req, res, nex) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Credentials", true);
    });
}