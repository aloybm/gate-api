const {
    poolPromise
} = require('../connections/mssqldb.js')

const getAllData = async (req,res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM kartu_akses`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch(err){
        res.status(500);
        return err.message;
    }
}

const masuk = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('idkartu', req.body.id_kartu_akses)
            .query(`SELECT is_aktif FROM kartu_akses WHERE id_kartu_akses = @id_kartu_akses`);
        const result2 = await pool.request()
            .input('idgate', req.body.id_tipe_gate)
            .query(`SELECT id_kartu_akses FROM register_gate WHERE id_tipe_gate = @id_tipe_gate`);
    
        if (result.recordset.length === 0) {
            return 'Invalid id tipe gate';
          } else if (result.recordset[0].is_aktif == 1 && result2.recordset[0].id_kartu_akses !=0) {
            return '1';
          } else if (result.recordset[0].is_aktif == 0 || result2.recordset[0].id_kartu_akses !=0) {
            return '0';
          }
          
    } catch(err){
        // res.status(500);
        return err.message;
    }
}

const keluar = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('idkartu', req.body.id_kartu_akses)
            .query(`SELECT is_aktif FROM kartu_akses WHERE id_kartu_akses = @id_kartu_akses`);
        const result2 = await pool.request()
            .input('idgate', req.body.id_tipe_gate)
            .query(`SELECT id_kartu_akses FROM register_gate WHERE id_tipe_gate = @id_tipe_gate`);
    
        if (result.recordset.length === 0) {
            return 'Invalid id tipe gate';
          } else if (result.recordset[0].is_aktif == 1 && result2.recordset[0].id_kartu_akses !=0) {
            return '1';
          } else if (result.recordset[0].is_aktif == 0 || result2.recordset[0].id_kartu_akses !=0) {
            return '0';
          }
          
    } catch(err){
        res.status(500);
        return err.message;
    }
}

module.exports = {
    getAllData: getAllData,
    masuk: masuk,
    keluar: keluar
}