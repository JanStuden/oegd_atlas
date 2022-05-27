const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NodeSchema = new Schema ({
    data: {
        id: String,
        Gebiet: String,
        Line2: String,
        parent: String,
        Strasse: String,
        PLZ: String,
        Ort: String,
        EMail: String,
        Tel: String,
        Fax: String,
        Ebene: String,
        Abkuerzung: String
    }
})

module.exports = mongoose.model('Node', NodeSchema)