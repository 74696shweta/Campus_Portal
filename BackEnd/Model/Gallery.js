const mongoose = require('mongoose');

const GallarySchema = new mongoose.Schema({
   
    image:{
        type : String,
        required : true
    },
    description: {
        type: String,
        require: true
    },
    approved: {
        type: String,
        require: true
    }
    

    
})
Gallary = mongoose.model('Gallary',GallarySchema);

module.exports = Gallary;
