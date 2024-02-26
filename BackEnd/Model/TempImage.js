const mongoose = require('mongoose');

const TempGallarySchema = new mongoose.Schema({
   
    image:{
        type : String,
        required : true
    },
    description: {
        type: String,
        require: true
    },
})
TempGallary = mongoose.model('TempGallary',TempGallarySchema);

module.exports = TempGallary;
