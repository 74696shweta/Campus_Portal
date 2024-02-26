const StaffSchema = require("../Model/Staff")
const noticeSchema = require("../Model/NoticeBoard")
const {imageHost } = require('../Config/ImageHost')
const nodemailer = require("nodemailer");
const bcrypt  = require('bcrypt')
const session = require('express-session')

exports.getStaff = (req,res) => {
    StaffSchema.find({role: {$ne : "Admin"}}).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })

}
exports.getAdmin = (req,res) => {
    StaffSchema.find({role: "Admin"}).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })

}
exports.getStaffProfile = (req,res) => {
    const id = req.session._id;
    StaffSchema.find({_id: id}).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "adixit1806@gmail.com",
      pass: "sbbh vior ssgu nkiz",
    },
  });

exports.addStaff = (req,res) => {
    const filePath  =  imageHost + req.file.filename

    const { staffid , fullname, email , mobile ,gender , dob , education, password ,  department , role, image} = req.body;

    StaffSchema.find({ email: email }).then((result) => {

    if (result.length > 0) {
        res.status(400).send({ status: 400, message: "Email already Exists****" })
    }
    else {
    if(!password  )
    {
        res.status(400).send({status : 400 , message : "Please Provide Password"})
    }
    else
    {

        bcrypt.genSalt(10 , (err , salt)=>{

            if(err){
                res.status(500).send({status : 500 , message : "Something Went Wrong Please Try again"})
            }
            else{
                let pass = password;
                bcrypt.hash(password ,  salt ,  (err  , hash)=>{
                    if(err)
                    {
                        res.status(500).send({status : 500 , message : "Something Went Wrong Please Try again"})

                    }else{
                        StaffSchema.insertMany({staffid : staffid , fullname: fullname, email: email , mobile: mobile ,gender: gender , dob: dob , education: education,  password: hash ,  department: department , role: role, image: filePath}).then((result)=>{

            if(result.length > 0)
            {

                transporter.sendMail({
                    from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Registration Done ✔", // Subject line
                    text: `Hi , ${fullname}`, // plain text body
                    html: `<h3>Hi , ${fullname} Your Registration has done Successfully on Campus Portal Your Email id: ${email} and password : ${pass} Please use this email id and password for accessing campus portal Account </h3>`, // html body
                }).then((mail_result)=>{
                
                    if(mail_result.messageId){
                
                        res.status(200).send({ status : 200, message : "User Registerd Successfully"})
                    }
                    else
                    {
                        res.status(500).send({status : 400 , message  :"Registration Failed"})
                
                    }
                
                }).catch((err)=>{
                    console.log(err)
                    res.status(500).send({status : 400 , message  :"Registration Failed"})
                
                })

            }
            else
            {
                res.status(400).send({ status:  400 , message : "User Not Registerd" })

            }

        }).catch((err)=>{

            console.log(err.code )
            console.log(err.name)
            console.log(err.message)
        })
        }
                })
            }
        })
    
    }
    }
    })
}

exports.getStaffById = (req, res) => {
    const {id}  = req.query

    StaffSchema.findOne({_id :  id}).then((result)=>{

     res.status(200).send({status : 200 , data  : result})
        
    }).catch((err)=>{
        res.status(500).send({status :  500 , messgae : "Something Went Wrong"})
    
    })
}
exports.updateStaff = (req,res) => {
    const {staffid , fullname, email , mobile ,gender , dob , education,  department , role, image, sid}  = req.body;


    StaffSchema.updateOne( {_id : sid} , {$set : { staffid: staffid , fullname: fullname, email: email , mobile: mobile ,gender: gender , dob: dob , education: education, department: department , role: role, image: image}}).then
    ((result)=>{
        if(result.modifiedCount == 1 )
        {
            res.status(200).send({status :200, message : "Staff Edited Successfully "})
        }
        else{
            res.status(200).send({status :200, message : "Staff Not Edited || Please Try Again "})
        }
    }).catch((err)=> res.json(err),console.log(res))
}

exports.deleteStaff = (req,res) => {
    const {id}  = req.body;

    StaffSchema.deleteOne({_id  :  id}).then((result)=>{
        if(result.deletedCount == 1)
        {
            res.status(200).send({status :  200 , messgae : "Staff Removed Successfully"})
        }
        else
        {
            res.status(400).send({status :  400 , messgae : "Staff Not Deleted"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status :  500 , messgae : "Something Went Wrong"})
    })
}

exports.updateStaffImage  =  (req, res) =>{

    const { id  } = req.body;
    console.log( id)
    
    const filePath  =  imageHost + req.file.filename
    console.log(filePath)

    StaffSchema.updateOne({  _id : id  } ,  {$set : {image :  filePath}}).then((result)=>{
        if(result.modifiedCount ==1)
        {
            res.status(200).send({status : 200 ,  message : "Image Updated Successfully"  , data : {image : filePath}})
        }
        else
        {
            res.status(400).send({status : 400 ,  message : "Image Not Updated"  })

        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status :  500 , messgae : "Something Went Wrong"})
    
    })
}

