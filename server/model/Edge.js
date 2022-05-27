const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NodeSchema = new Schema ({
    data: {
        id: String,
        source: String,
        target: String,
    }
})

module.exports = mongoose.model('Edge', NodeSchema)