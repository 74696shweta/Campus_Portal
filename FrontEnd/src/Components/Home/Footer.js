import { NavLink } from "react-router-dom";

export function Footer() {
    return(
        <>
<footer className="text-center text-lg-start bg-body-alert-secondary text-muted" style={{color: "white"}}>

  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{color:"white"}}>

    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>

    <div style={{color:"white"}}>
      <NavLink to="www.facebook.com" className="me-4 text-reset">
        <i className="fab fa-facebook-f" ></i>
      </NavLink>
      <NavLink to="https://twitter.com/" className="me-4 text-reset">
        <i className="fab fa-twitter" ></i>
      </NavLink>
      <NavLink to="https://www.instagram.com/" className="me-4 text-reset">
        <i className="fab fa-instagram" ></i>
      </NavLink>
      <NavLink to="https://www.linkedin.com/" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </NavLink>
    </div>

  </section>

  <section className="" style={{color:"white"}}>
    <div className="container text-center text-md-start mt-5">

      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>
          </h6>
          <p>
          A college is an educational institution that offers a general or liberal arts education. Colleges can be tertiary educational institutions, part of a university.
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

          <h6 className="text-uppercase fw-bold mb-4">
            Departments
          </h6>
          <p>
            <NavLink to="#!" className="text-reset">Engineering</NavLink>
          </p>
          <p>
            <NavLink to="#!" className="text-reset">Management</NavLink>
          </p>
          <p>
            <NavLink to="#!" className="text-reset">Science</NavLink>
          </p>
          <p>
            <NavLink to="#!" className="text-reset">Medical</NavLink>
          </p>
        </div>

        
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3"></i> 212,7th cross,Prajapat road,bengaluru,560001</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            info@example.com
          </p>
          <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
        </div>
      </div>
    </div>
  </section>

  <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05);", color:"white"}}>
    © 2024 Copyright:
    <NavLink className="text-reset fw-bold" to="/">Educ@tionforall</NavLink>
  </div>

</footer>
        </>
    )
}