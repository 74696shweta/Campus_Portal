const studentSchema = require("../Model/StudentModel")
const staffSchema = require("../Model/Staff")
const OtpSchema = require("../Model/OtpSchema")
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const session = require('express-session')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "adixit1806@gmail.com",
        pass: "sbbh vior ssgu nkiz",
    },
});

exports.sendEmail = async (req, res) => {
    const { senderEmail, subject, message } = req.body;

    // Validate senderEmail, subject, and message before proceeding

    const mailOptions = {
        from: senderEmail,
        to: 'adixit1806@gmail.com', // Replace with your desired recipient email
        subject: subject,
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};


exports.StudentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await studentSchema.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).send({ status: 400, message: "User does not exist", data: { valid: false } });
        }

        const auth = await bcrypt.compare(password, existingUser.password);

        if (!auth) {
            return res.status(400).send({ status: 400, message: "Incorrect Password", data: { valid: false } });
        }

        req.session.username = existingUser.fullname;
        req.session._id = existingUser._id;

        console.log(req.session.username);

        return res.status(200).send({
            status: 200,
            message: "Login Successfully",
            userId: existingUser._id,
            data: { _id: existingUser._id, fullname: existingUser.fullname, valid: true }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Something Went Wrong", data: { valid: false } });
    }
};



exports.StaffLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const existingUser = await staffSchema.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).send({ status: 400, message: "User does not exist", data: { valid: false } });
        }

        const auth = await bcrypt.compare(password, existingUser.password);

        if (!auth) {
            return res.status(400).send({ status: 400, message: "Incorrect Password", data: { valid: false } });
        }

        req.session.username = existingUser.fullname;
        req.session._id = existingUser._id;
        req.session.role = existingUser.role;

        console.log(req.session.username);

        return res.status(200).send({
            status: 200,
            message: "Login Successfully",
            userId: existingUser._id,
            data: { _id: existingUser._id, fullname: existingUser.fullname, valid: true }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Something Went Wrong", data: { valid: false } });
    }
}

exports.SessionManage = (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false })
    }
}
exports.SessionManageForStaff = (req, res) => {
    if (req.session.username && req.session.role) {
        return res.json({ valid: true, username: req.session.username, role: req.session.role, _id: req.session._id })
    } else {
        return res.json({ valid: false })
    }
}

exports.Logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.sendStatus(500);
        }
        res.clearCookie('connect.sid');
        console.log("User Logged Out !!!")
        res.sendStatus(200);
    });
}

exports.StudentForgotPassword = (req, res) => {
    const { email } = req.body;

    let otp = Math.floor(Math.random() * 456745).toString().padStart(6, 0)
    console.log(otp)
    studentSchema.find({ email: email }).then((res1) => {

        if (res1.length > 0) {
            OtpSchema.find({ u_id: res1[0]._id }).then((find_res) => {
                if (find_res.length > 0) {
                    OtpSchema.updateOne({ u_id: res1[0]._id }, { $set: { otp: otp, time: Number(new Date()) } }).then((res2) => {

                        if (res2.modifiedCount == 1) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].fullname}`, // plain text body
                                html: `<h1>Please Use this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {

                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })


                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })

                        }


                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })


                }
                else {
                    OtpSchema.insertMany({ u_id: res1[0]._id, otp: otp, time: Number(new Date()) }).then((res2) => {

                        if (res2.length > 0) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].fullname}`, // plain text body
                                html: `<h1>Please Use this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {
                                    console.log(mail_result)
                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    console.log(mail_result)
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })
                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })

                        }


                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })
                }
            })
        }
        else {
            res.status(400).send({ status: 400, message: "Your are not a Registered User || Please Register First" })

        }

    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something Went Wrong" })

    })

}

exports.StaffForgotPassword = (req, res) => {
    const { email } = req.body;

    let otp = Math.floor(Math.random() * 456745).toString().padStart(6, 0)
    console.log(otp)
    staffSchema.find({ email: email }).then((res1) => {

        if (res1.length > 0) {
            OtpSchema.find({ u_id: res1[0]._id }).then((find_res) => {
                if (find_res.length > 0) {
                    OtpSchema.updateOne({ u_id: res1[0]._id }, { $set: { otp: otp, time: Number(new Date()) } }).then((res2) => {

                        if (res2.modifiedCount == 1) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].fullname}`, // plain text body
                                html: `<h1>Please Use this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {

                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })


                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })

                        }


                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })


                }
                else {
                    OtpSchema.insertMany({ u_id: res1[0]._id, otp: otp, time: Number(new Date()) }).then((res2) => {

                        if (res2.length > 0) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].fullname}`, // plain text body
                                html: `<h1>Please Use this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {

                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })
                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })

                        }


                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })
                }
            })
        }
        else {
            res.status(400).send({ status: 400, message: "Your are not a Registered User || Please Register First" })

        }

    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something Went Wrong" })

    })

}
exports.verify_passwordForStudent = (req, res) => {

    const { email, otp, new_password, confirm_password } = req.body;


    if (!new_password || !confirm_password) {
        res.status(400).send({ status: 400, message: "New Password / Confirm Password Cannot be Empty" })
    }
    else if (new_password != confirm_password) {
        res.status(400).send({ status: 400, message: "New Password Could not match with Confirm Password" })

    }
    else if (!otp) {
        res.status(400).send({ status: 400, message: "OTP Cannot be Empty" })
    }
    else {

        studentSchema.find({ email: email }).then((r1) => {

            if (r1.length > 0) {

                OtpSchema.find({ u_id: r1[0]._id }).then((r2) => {

                    if (r2.length > 0) {

                        if (otp == r2[0].otp) {

                            if (Number(new Date()) - r2[0].time > 30000) {
                                res.status(498).send({ status: 498, message: "OTP Expird" })

                            }
                            else {


                                bcrypt.genSalt(10, (err, salt) => {

                                    if (err) {
                                        console.log(err)

                                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                    }
                                    else {
                                        bcrypt.hash(new_password, salt, (err, hash) => {
                                            if (err) {
                                                console.log(err)

                                                res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                            }
                                            else {

                                                staffSchema.updateOne({ _id: r1[0]._id }, { $set: { password: hash } }).then((r4) => {
                                                    if (r4.modifiedCount == 1) {


                                                        OtpSchema.deleteOne({ _id: r2[0]._id }).then((r5) => {
                                                            if (r5.deletedCount == 1) {
                                                                res.status(200).send({ status: 200, message: "Your Password has reset Successfully" })


                                                            } else {
                                                                res.status(200).send({ status: 200, message: "Your Password has reset Successfully" })

                                                            }
                                                        }).catch((err) => {
                                                            res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                                        })


                                                    }
                                                    else {

                                                        res.status(500).send({ status: 500, message: "Password Reset Failed" })
                                                    }


                                                }).catch((err) => {
                                                    console.log(err)

                                                    res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                                })

                                            }
                                        })
                                    }

                                })


                            }


                        }
                        else {
                            res.status(400).send({ status: 400, message: "Invalid OTP" })

                        }


                    } else {
                        res.status(400).send({ status: 400, message: "OTP Verification Failed || Please Try With Resend OTP " })

                    }



                }).catch((err) => {
                    console.log(err)

                    res.status(500).send({ status: 500, message: "Something Went Wrong" })

                })


            }
            else {
                res.status(400).send({ status: 400, message: "Your are not a Registered User || Please Register First" })

            }

        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: 500, message: "Something Went Wrong" })

        })

    }




}



exports.resendOtpStudent = (req, res) => {
    const { email } = req.body;

    let otp = Math.floor(Math.random() * 456745).toString().padStart(6, 0)
    console.log(otp)
    studentSchema.find({ email: email }).then((res1) => {
        if (res1.length > 0) {
            OtpSchema.find({ u_id: res1[0]._id }).then((otp_res) => {
                if (otp_res.length > 0) {
                    OtpSchema.updateOne({ u_id: res1[0]._id }, { $set: { otp: otp, time: Number(new Date()) } }).then((res2) => {

                        if (res2.modifiedCount == 1) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].fullname}`, // plain text body
                                html: `<h1>Please User this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {

                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })
                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })
                        }
                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })
                }
                else {
                    OtpSchema.insertMany({ u_id: res1[0]._id, otp: otp, time: Number(new Date()) }).then((res2) => {

                        if (res2.length > 0) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].name}`, // plain text body
                                html: `<h1>Please User this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {

                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })
                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })
                        }
                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })
                }
            }).catch((err) => {
                res.status(500).send({ status: 500, message: "Something Went Wrong" })

            })
        }
        else {
            res.status(400).send({ status: 400, message: "Your are not a Registered User || Please Register First" })

        }

    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something Went Wrong" })

    })
}


exports.verify_passwordForStaff = (req, res) => {

    const { email, otp, new_password, confirm_password } = req.body;


    if (!new_password || !confirm_password) {
        res.status(400).send({ status: 400, message: "New Password / Confirm Password Cannot be Empty" })
    }
    else if (new_password != confirm_password) {
        res.status(400).send({ status: 400, message: "New Password Could not match with Confirm Password" })

    }
    else if (!otp) {
        res.status(400).send({ status: 400, message: "OTP Cannot be Empty" })
    }
    else {

        staffSchema.find({ email: email }).then((r1) => {

            if (r1.length > 0) {

                OtpSchema.find({ u_id: r1[0]._id }).then((r2) => {

                    if (r2.length > 0) {

                        if (otp == r2[0].otp) {

                            if (Number(new Date()) - r2[0].time > 30000) {
                                res.status(498).send({ status: 498, message: "OTP Expird" })

                            }
                            else {


                                bcrypt.genSalt(10, (err, salt) => {

                                    if (err) {
                                        console.log(err)

                                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                    }
                                    else {
                                        bcrypt.hash(new_password, salt, (err, hash) => {
                                            if (err) {
                                                console.log(err)

                                                res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                            }
                                            else {

                                                staffSchema.updateOne({ _id: r1[0]._id }, { $set: { password: hash } }).then((r4) => {
                                                    if (r4.modifiedCount == 1) {


                                                        OtpSchema.deleteOne({ _id: r2[0]._id }).then((r5) => {
                                                            if (r5.deletedCount == 1) {

                                                                res.status(200).send({ status: 200, message: "Your Password has reset Successfully" })


                                                            } else {
                                                                res.status(200).send({ status: 200, message: "Your Password has reset Successfully" })

                                                            }
                                                        }).catch((err) => {
                                                            res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                                        })


                                                    }
                                                    else {

                                                        res.status(500).send({ status: 500, message: "Password Reset Failed" })
                                                    }


                                                }).catch((err) => {
                                                    console.log(err)

                                                    res.status(500).send({ status: 500, message: "Something Went Wrong" })

                                                })

                                            }
                                        })
                                    }

                                })


                            }


                        }
                        else {
                            res.status(400).send({ status: 400, message: "Invalid OTP" })

                        }


                    } else {
                        res.status(400).send({ status: 400, message: "OTP Verification Failed || Please Try With Resend OTP " })

                    }



                }).catch((err) => {
                    console.log(err)

                    res.status(500).send({ status: 500, message: "Something Went Wrong" })

                })


            }
            else {
                res.status(400).send({ status: 400, message: "Your are not a Registered User || Please Register First" })

            }

        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: 500, message: "Something Went Wrong" })

        })

    }




}



exports.resendOtpStaff = (req, res) => {
    const { email } = req.body;

    let otp = Math.floor(Math.random() * 456745).toString().padStart(6, 0)

    staffSchema.find({ email: email }).then((res1) => {
        if (res1.length > 0) {
            OtpSchema.find({ u_id: res1[0]._id }).then((otp_res) => {
                if (otp_res.length > 0) {
                    OtpSchema.updateOne({ u_id: res1[0]._id }, { $set: { otp: otp, time: Number(new Date()) } }).then((res2) => {

                        if (res2.modifiedCount == 1) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].fullname}`, // plain text body
                                html: `<h1>Please User this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {

                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })
                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })
                        }
                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })
                }
                else {
                    OtpSchema.insertMany({ u_id: res1[0]._id, otp: otp, time: Number(new Date()) }).then((res2) => {

                        if (res2.length > 0) {

                            transporter.sendMail({
                                from: '"EducationForAll" <adixit1806@gmail.com>', // sender address
                                to: res1[0].email, // list of receivers
                                subject: "Password Reset OTP ✔", // Subject line
                                text: `Hi , ${res1[0].name}`, // plain text body
                                html: `<h1>Please User this OTP : ${otp} to Reset Your Password</h1>`, // html body
                            }).then((mail_result) => {

                                if (mail_result.messageId) {

                                    res.status(200).send({ status: 200, message: "OTP Sent Successfully on your email" })
                                }
                                else {
                                    res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                                }

                            }).catch((err) => {
                                console.log(err)
                                res.status(500).send({ status: 400, message: "OTP Sent Failed" })

                            })
                        }
                        else {
                            res.status(500).send({ status: 500, message: "Something Went Wrong" })
                        }
                    }).catch((err) => {
                        res.status(500).send({ status: 500, message: "Something Went Wrong" })

                    })
                }
            }).catch((err) => {
                res.status(500).send({ status: 500, message: "Something Went Wrong" })

            })
        }
        else {
            res.status(400).send({ status: 400, message: "Your are not a Registered User || Please Register First" })

        }

    }).catch((err) => {
        res.status(500).send({ status: 500, message: "Something Went Wrong" })

    })
}

exports.getDashBoardData = async(req, res) => {


    let fc = await staffSchema.find({}).count()
    let sc = await  studentSchema.find({}).count()
    let ac =  await staffSchema.find({ role: "Admin" }).count()
    console.log(sc);

    let dashboardData = {
        Faculty: fc,
        Admin: ac,
        Student: sc
    }
    res.status(200).send({ status: 200, data: dashboardData })
}
