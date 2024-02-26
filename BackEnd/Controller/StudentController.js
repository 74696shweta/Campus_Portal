const studentSchema = require("../Model/StudentModel")
const { imageHost } = require('../Config/ImageHost')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
exports.getStudent = (req, res) => {
    studentSchema.find({}).then((result) => {
        res.status(200).send({ status: 200, data: result })
    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something went wrong" })
    })

}
exports.getStudentProfile = (req, res) => {
    const id = req.session._id;
    studentSchema.find({ _id: id }).then((result) => {
        res.status(200).send({ status: 200, data: result })
    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something went wrong" })
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

exports.addStudent = (req, res) => {
    const filePath = imageHost + req.file.filename

    const { enrollid, fullname, email, mobile, gender, dob, acadamicyear, password, department, clas, image } = req.body;
    // const existingUser = studentSchema.findOne({ email });
    // if (existingUser){
    //   return res.status(400).json({
    //     errorMessage: "An account with this email already exists.",
    //   });}
    studentSchema.find({ email: email }).then((result) => {

        if (result.length > 0) {
            res.status(400).send({ status: 400, message: "Email already Exists****" })
        }
        else {
            if (!password) {
                res.status(400).send({ status: 400, message: "Please Provide Password" })
            }
            else {

                bcrypt.genSalt(10, (err, salt) => {

                    if (err) {
                        res.status(500).send({ status: 500, message: "Something Went Wrong Please Try again" })
                    }
                    else {
                        let pass = password;
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                res.status(500).send({ status: 500, message: "Something Went Wrong Please Try again" })

                            } else {
                                studentSchema.insertMany({ enrollid: enrollid, fullname: fullname, email: email, mobile: mobile, gender: gender, dob: dob, acadamicyear: acadamicyear, password: hash, department: department, clas: clas, image: filePath, block: false }).then((result) => {

                                    if (result.length > 0) {

                                        transporter.sendMail({
                                            from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                            to: email, // list of receivers
                                            subject: "Registration Done ✔", // Subject line
                                            text: `Hi , ${fullname}`, // plain text body
                                            html: `<h3>Hi , ${fullname} Your Registration has done Successfully on Campus Portal Your Email id: ${email} and password : ${pass} Please use this email id and password for accessing campus portal Account</h3>`, // html body
                                        }).then((mail_result) => {

                                            if (mail_result.messageId) {

                                                res.status(200).send({ status: 200, message: "User Registerd Successfully" })
                                            }
                                            else {
                                                res.status(500).send({ status: 400, message: "Registration Failed" })

                                            }

                                        }).catch((err) => {
                                            console.log(err)
                                            res.status(500).send({ status: 400, message: "Registration Failed" })

                                        })

                                    }
                                    else {
                                        res.status(400).send({ status: 400, message: "User Not Registerd" })

                                    }

                                }).catch((err) => {

                                    console.log(err.code)
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




exports.getStudentById = (req, res) => {
    const { id } = req.query

    UserSchema.findOne({ _id: id }).then((result) => {

        res.status(200).send({ status: 200, data: result })

    }).catch((err) => {
        res.status(500).send({ status: 500, messgae: "Something Went Wrong" })

    })
}
exports.updateStudent = (req, res) => {
    const { enrollid, fullname, email, mobile, gender, dob, acadamicyear, department, clas, image, sid } = req.body;


    studentSchema.updateOne({ _id: sid }, { $set: { enrollid: enrollid, fullname: fullname, email: email, mobile: mobile, gender: gender, dob: dob, acadamicyear: acadamicyear, department: department, clas: clas, image: image } }).then
        ((result) => {
            if (result.modifiedCount == 1) {
                res.status(200).send({ status: 200, message: "Student Edited Successfully " })
            }
            else {

                res.status(200).send({ status: 200, message: "Student Not Edited || Please Try Again " })

            }
        }).catch((err) => res.json(err), console.log(res))
}

exports.deleteStudent = (req, res) => {
    const { id } = req.body;

    studentSchema.deleteOne({ _id: id }).then((result) => {
        if (result.deletedCount == 1) {
            res.status(200).send({ status: 200, messgae: "Student Removed Successfully" })
        }
        else {
            res.status(400).send({ status: 400, messgae: "Student Not Deleted" })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ status: 500, messgae: "Something Went Wrong" })
    })
}

exports.updateStudentImage = (req, res) => {

    const { sid } = req.body;
    console.log(sid)

    const filePath = imageHost + req.file.filename
    console.log(filePath)

    studentSchema.updateOne({ _id: sid }, { $set: { image: filePath } }).then((result) => {
        if (result.modifiedCount == 1) {
            res.status(200).send({ status: 200, message: "Image Updated Successfully", data: { image: filePath } })
        }
        else {
            res.status(400).send({ status: 400, message: "Image Not Updated" })

        }
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ status: 500, messgae: "Something Went Wrong" })

    })


}

exports.BlockStudent = (req,res) => {
    const { sid } = req.body
    studentSchema.updateOne({_id: sid},{$set: {block: true}}).then
    ((result) => {
        if (result.modifiedCount == 1) {
            res.status(200).send({ status: 200, message: "Student is Blocked " })
        }
        else {

            res.status(200).send({ status: 200, message: "Student Not Blocked " })

        }
    }).catch((err) => res.json(err), console.log(res))
}
exports.showBlockedUser = (req,res) => {
    studentSchema.findOne({block: true}).then((result) => {
        res.status(200).send({ status: 200, data: result })
    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something went wrong" })
    })
}
exports.UnblockStudent = (req,res) => {
    const { sid } = req.body
    studentSchema.updateOne({_id: sid},{$set: {block: false}}).then
    ((result) => {
        if (result.modifiedCount == 1) {
            res.status(200).send({ status: 200, message: "Student is Unblocked " })
        }
        else {

            res.status(200).send({ status: 200, message: "Student Not Unblocked " })

        }
    }).catch((err) => res.json(err), console.log(res))
}
