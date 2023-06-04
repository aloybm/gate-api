const {
    poolPromise
} = require('../connections/mssqldb.js')


async function insertlog(idKartu, idGate, cek, is_valid) {
    let table;
    if (cek == 'MASUK') table = 'log_masuk';
    else table = 'log_keluar';
    const query = `INSERT INTO ${table} (id_kartu_akses, id_register_gate, is_valid) VALUES ('${idKartu}', ${idGate}, ${is_valid})`;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(query);
        console.log(`Aktivitas ${cek} berhasil dicatat.`);
        return result;
    } catch (err) {
        console.log(`Gagal mencatat aktivitas ${cek}: ${err}`);
        throw err;
    }
}

  
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
        // res.status(500);
        return err.message;
    }
}

const masuk = async (req, res) => {
    try {
        const pool = await poolPromise;
        const idkartu = req.body.idkartu;
        const idgate = req.body.idgate;
        const result = await pool.request()
            .input('idkartu', idkartu)
            .query(`SELECT * FROM kartu_akses WHERE id_kartu_akses = '${idkartu}'`);
        const result2 = await pool.request()
            .input('idgate', idgate)
            .query(`SELECT * FROM register_gate WHERE id_register_gate = '${idgate}'`);
    
        if (result.recordset.length === 0 || result2.recordset.length === 0) {
            console.log("Invalid idgate or idkartu ");
            return '0';
          } else if (result.recordset[0].is_aktif == 1) {
            insertlog(idkartu, idgate, "MASUK", 1);
            return '1';
          } else if (result.recordset[0].is_aktif == 0 ) {
            insertlog(idkartu, idgate,"MASUK", 0);
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
        const idkartu = req.body.idkartu;
        const idgate = req.body.idgate;
        const result = await pool.request()
            .input('idkartu', idkartu)
            .query(`SELECT * FROM kartu_akses WHERE id_kartu_akses = '${idkartu}'`);
        const result2 = await pool.request()
            .input('idgate', idgate)
            .query(`SELECT * FROM register_gate WHERE id_register_gate = '${idgate}'`);

        if (result.recordset.length === 0 || result2.recordset.length === 0) {
            console.log("Invalid idgate or idkartu ");
            return '0';
        } else if (result.recordset[0].is_aktif == 1) {
            insertlog(idkartu, idgate, "KELUAR", 1);
            return '1';
        } else if (result.recordset[0].is_aktif == 0) {
            insertlog(idkartu, idgate, "KELUAR", 0);
            return '0';
        }
    } catch(err){
        // res.status(500);
        return err.message;
    }
}


module.exports = {
    getAllData: getAllData,
    masuk: masuk,
    keluar: keluar
}

