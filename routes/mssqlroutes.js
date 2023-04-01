module.exports = app => {
    const router = require("express").Router();
    const mssqlController = require('../controller/mssqlcontroller.js');

    router.get('/test', mssqlController.getAllData);
    router.post('/masuk', mssqlController.masuk);
    router.post('/keluar', mssqlController.keluar)

    app.use('/api', router);
}