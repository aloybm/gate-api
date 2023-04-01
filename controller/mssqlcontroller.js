const mssqlService = require('../services/mssqlservice.js')

const getAllData = (req, res) => {
    return mssqlService.getAllData()
    .then(resData => {
        res.status(200).json({
            'success': true,
            'code': 200,
            'data': resData
        });
    })
    .catch(err => {
        res.status(500).json({
            'success': false,
            'code': 500,
            'data': err
        });
    });
}

const masuk = (req, res) => {
    return mssqlService.masuk(req)
    .then(resData => {
        res.status(200).json({
            'result' :resData
        });
    })
    .catch(err => {
        res.status(500).json({
            'error': err,
        }
        
        );
        console.log(err);
    });
}

const keluar = (req, res) => {
    return mssqlService.masuk(req)
    .then(resData => {
        res.status(200).json({  
            'result': resData
        });
    })
    .catch(err => {
        res.status(500).json({
            'error': err
        }
        );
        console.log(err);
    });
}

module.exports = {
    getAllData: getAllData,
    masuk: masuk,
    keluar: keluar
}