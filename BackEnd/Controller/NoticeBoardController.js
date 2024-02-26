const StaffSchema = require("../Model/Staff")
const noticeSchema = require("../Model/NoticeBoard")
const {imageHost } = require('../Config/ImageHost')
const nodemailer = require("nodemailer");

const session = require('express-session')

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


exports.getNotice = (req,res) => {
    noticeSchema.find({}).sort({_id: -1}).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })      

}
exports.getNoticeByRole = (req,res) => {
    let uid = req.session._id;
    noticeSchema.find({userid: uid}).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })

}
exports.getTenNotice = (req,res) => {
    noticeSchema.find({}).sort({_id: -1}).limit(5).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })

}

exports.getNoticeById = (req,res) => {
    const {id}  = req.query

    noticeSchema.findOne({_id :  id}).then((result)=>{

     res.status(200).send({status : 200 , data  : result})
        
    }).catch((err)=>{
        res.status(500).send({status :  500 , messgae : "Something Went Wrong"})
    
    })
}

exports.AddNotice = (req,res) => {
    const filePath  =  imageHost + req.file.filename

    const { userid , topic , description, eventdate, contact, image} = req.body;
    
    const uid = req.session._id;
    console.log(uid)
    noticeSchema.insertMany({userid : uid, topic: topic, description: description,eventdate : eventdate,contact: contact, image: filePath}).then((result) => {
            if(result.length > 0) {
                res.status(200).send({status: 200, message: "Notice Published Successfully...."})
            } else {
                res.status(200).send({status: 200, message: "Please try again...."})
            }
        }).catch((err) => {
            res.status(500).send({status: 500, message: "Something went Wrong...."})
        })
                // transporter.sendMail({
                //     from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                //     to: email, // list of receivers
                //     subject: "New Notice Uploaded on Campuse Portal", // Subject line
                //     text: `Hi , ${fullname}`, // plain text body
                //     html: `<h3>Hi , ${fullname} 
                //     New notice uploaded on site on Topic: ${topic} for more detail please visit the site.</h3>`, // html body
                // }).then((mail_result)=>{
                
                //     if(mail_result.messageId){
                
                //         res.status(200).send({ status : 200, message : "Uploaded Successfully"})
                //     }
                //     else
                //     {
                //         res.status(500).send({status : 400 , message  :"Failed"})
                
                //     }
                
                // }).catch((err)=>{
                //     console.log(err)
                //     res.status(500).send({status : 400 , message  :"Failed"})
                
                // })
}

exports.updateNotice = (req,res) => {
    
    const { topic , description, eventdate, contact ,image , nid}  = req.body;
    noticeSchema.updateOne( {_id : nid} , {$set : { topic: topic, description: description, eventdate: eventdate, contact: contact,image: image}}).then
    ((result)=>{
        if(result.modifiedCount == 1 )
        {
            res.status(200).send({status :200, message : "Notice Edited Successfully "})
        }
        else{
            res.status(200).send({status :200, message : "Notice Not Edited || Please Try Again "})
        }
    }).catch((err)=> res.json(err),console.log(res))

    
}


exports.deleteNotice = (req,res) => {
    const {id}  = req.body;

    noticeSchema.deleteOne({_id  :  id}).then((result)=>{
        if(result.deletedCount == 1)
        {
            res.status(200).send({status :  200 , messgae : "Notice Removed Successfully"})
        }
        else
        {
            res.status(400).send({status :  400 , messgae : "Notice Not Deleted"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status :  500 , messgae : "Something Went Wrong"})
    })
}

exports.updateNoticeImage  =  (req, res) =>{

    const { nid  } = req.body;
    console.log( nid)
    
    const filePath  =  imageHost + req.file.filename
    console.log(filePath)

    noticeSchema.updateOne({_id : nid} ,  {$set : {image :  filePath}}).then((result)=>{
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
