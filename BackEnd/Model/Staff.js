const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    staffid : {
        type: String,
        require: true,
        uniqueKey: true
    },
    fullname :{
        type: String,
        require: true
    },
    email : {
        type : String,
        require : true,
        uniqueKey : true
    },
    mobile: {
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
    gender : {
        type : String,
        require : true,
    },
    dob:{
        type : String,
        require : true,
    },
    education: {
        type: String,
        require: true
    },
    password : {
        type : String,
        require: true
    },
    department : {
        type: String,
        require : true
    },
    role : {
        type : String,
        require : true
    },
    image:{
        type : String,
        required : true
    }
    

    
})

StaffModel = mongoose.model('Staff',StaffSchema);

module.exports = StaffModel;
