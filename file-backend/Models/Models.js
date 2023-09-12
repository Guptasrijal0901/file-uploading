const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema(
   { name: {type: String,
    trim: true, 
    required: true},
    description: {type: String,
    trim: true, 
    required: true},
},
{timestamps: true}
)
const collection = mongoose.model("file-data", fileSchema)
module.exports = collection;