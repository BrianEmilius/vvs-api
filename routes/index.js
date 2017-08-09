module.exports = function (server) {
    require('./pages')(server);
    require('./images')(server);
    //require('./messages')(server);
};