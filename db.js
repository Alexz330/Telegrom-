const db = require('mongoose')
db.Promise = global.Promise

// 
const connect = async(url) => {

    await db.connect(url)
    console.log("[db] Conectada con exito")
}
module.exports =  connect