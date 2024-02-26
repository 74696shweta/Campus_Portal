
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { StaffDashboard } from "./StaffDashboard";

var BASE_URL = "http://localhost:9800/admin"

export function ApproveImage() {

    const { state } = useLocation()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        image: state.image,
        description: state.description,
        id: state._id
    })

    const handleForm = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const handleSubmit = () => {

        axios.post(BASE_URL + '/add-image', values).then((res) => {
            console.log("Success")
            handleDelete()
            navigate("/staff/showimage");
        }).catch((err) => {
            console.log(err)
            console.log("Something went wrong")
        })
    }
    const handleDelete = () => {
        axios.post(BASE_URL + '/delete-temp-image',{ id: values.id }).then((res) => {
            //toast.success(res.data.message)
            console.log(res)
        }).catch((err) => {
            console.log(err);
            //toast.error(err.response.data.message)
        })

    }
    return (

        <>
            <StaffDashboard />
            <section className="vh-100" style={{ backgroundColor: "#2779e2;", marginLeft: "200px" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                           
                                <input type="hidden" name='id' value={values.id} onChange={handleForm} />


                                <div className="card" style={{ borderRadius: "15px;" }}>
                                    <div className="card-body">

                                        <div className="row align-items-center pt-4 pb-3">
                                            <div className="col-md-3 ps-5">

                                                <h6 className="mb-0">Description</h6>

                                            </div>
                                            <div className="col-md-9 pe-5">

                                                <input type="text" value={values.description} onChange={handleForm} name="description" className="form-control form-control-lg" />

                                            </div>
                                        </div>

                                        <hr className="mx-n3" />

                                        <div className="row align-items-center py-3">
                                            <div className="col-md-3 ps-5">

                                                <h6 className="mb-0">Upload Image</h6>

                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <img src={values.image} width='200px' height='200px' />
                                            </div>
                                        </div>


                                        <hr className="mx-n3" />

                                        <div className="px-5 py-4 mb-4">
                                            <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg">Approve Image</button>
                                        </div>

                                    </div>
                                </div>


                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}