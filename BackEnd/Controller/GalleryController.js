const GallarySchema = require("../Model/Gallery")
const TempSchema = require("../Model/TempImage")
const {imageHost } = require('../Config/ImageHost')
exports.getimage = (req,res) => {
    GallarySchema.find({}).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })

}
exports.getTempImage = (req,res) => {
    TempSchema.find({}).then((result) => {
        res.status(200).send({status: 200, data : result})
    }).catch((err) => {
        res.status(500).send({status: 500, message: "Something went wrong"})
    })

}

exports.addimage = (req,res) => {


    const {  image , description} = req.body;

    GallarySchema.insertMany({ image: image, description: description, approved: "true"}).then((result
        ) => {
            if(result.length > 0) {
                res.status(200).send({status: 200, message: "Image Added Successfully...."})
            } else {
                res.status(200).send({status: 200, message: "Please try again...."})
            }
        }).catch((err) => {
            res.status(500).send({status: 500, message: "Something went Wrong...."})
        })
}

exports.addstaffimage = (req,res) => {

    const filePath  =  imageHost + req.file.filename
    const {  image , description} = req.body;

    GallarySchema.insertMany({ image: filePath, description: description, approved: "true"}).then((result
        ) => {
            if(result.length > 0) {
                res.status(200).send({status: 200, message: "Image Added Successfully...."})
            } else {
                res.status(200).send({status: 200, message: "Please try again...."})
            }
        }).catch((err) => {
            res.status(500).send({status: 500, message: "Something went Wrong...."})
        })
}


exports.addTempimage = (req,res) => {
    const filePath  =  imageHost + req.file.filename

    const {  image , description} = req.body;

    TempSchema.insertMany({ image: filePath, description: description}).then((result
        ) => {
            if(result.length > 0) {
                res.status(200).send({status: 200, message: "Image Added Successfully...."})
            } else {
                res.status(200).send({status: 200, message: "Please try again...."})
            }
        }).catch((err) => {
            res.status(500).send({status: 500, message: "Something went Wrong...."})
        })
}

exports.deleteimage = (req,res) => {
    const {id}  = req.body;

    GallarySchema.deleteOne({_id  :  id}).then((result)=>{
        if(result.deletedCount == 1)
        {
            res.status(200).send({status :  200 , messgae : "Image Removed Successfully"})
        }
        else
        {
            res.status(400).send({status :  400 , messgae : "Image Not Deleted"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status :  500 , messgae : "Something Went Wrong"})
    })
}
exports.deletetempimage = (req,res) => {
    const {id}  = req.body;

    TempSchema.deleteOne({_id  :  
        id}).then((result)=>{
        if(result.deletedCount == 1)
        {
            res.status(200).send({status :  200 , messgae : "Image Removed Successfully"})
        }
        else
        {
            res.status(400).send({status :  400 , messgae : "Image Not Deleted"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status :  500 , messgae : "Something Went Wrong"})
    })
}

// exports.updatePermission = (req,res) => {
//     const {id} = req.body
//     GallarySchema.updateOne( {_id : id} , {$set : { approved: "true" }}).then
//     ((result)=>{
//         if(result.modifiedCount == 1 )
//         {
//             res.status(200).send({status :200, message : "Approved Image "})
//         }
//         else{
//             res.status(200).send({status :200, message : "Not yet approved "})
//         }
//     }).catch((err)=> res.json(err),console.log(res))

    
// }