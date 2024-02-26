const mongoose = require('mongoose');

const NoticeBoardSchema = new mongoose.Schema({
    userid : {
        type: String,
        require: true,
    },
    topic: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    eventdate: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Validate that the mobile number has exactly 10 digits
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
    },
    image:{
        type : String,
        required : true
    }
    

    
})
NoticeBoardModel = mongoose.model('noticeboard',NoticeBoardSchema);

module.exports = NoticeBoardModel;
