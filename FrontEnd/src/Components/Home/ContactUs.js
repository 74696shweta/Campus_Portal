import '../../Style/contactus.css'
import { Layout } from './Layout'
export function ContactUs(){
    return(
        <>
        <Layout/>
        <br /><br /><br /><br />
        <br /><br />
        <div className="cont">
            <div className="contact-box">
                <div className="contact-left">
                <h3>Send your request</h3>
                <form>
                    <div className="input-row">
                        <div className="input-group">
                        <lable>Name:</lable>
                        <input type="text" className='' placeholder="Enter your name" />
                        </div>
                        <br />
                        <div className="input-group">
                        <lable>Email:</lable>
                        <input type="email" placeholder="Enter your email" />
                        </div><br />
                        <div className="input-group">
                        <lable>Subject:</lable>
                        <input type="text" placeholder="Enter subject" />
                        </div>
                    </div>
                    <label>Message:</label>
                    <textarea rows="5" placeholder="Your message"></textarea>
                    <button className="btm" type="submit">Submit</button>
                </form>
                </div>
                
                <div className="contact-right">
                <h3 style={{marginTop: "50px"}}>Reach Us</h3><br />
                <table>
                    <tr>
                        <p style={{fontWeight: "bolder",fontSize:"18px"}}>Email : </p>
                        <p>educ@tionforall.com</p>
                    </tr>
                    <br/>
                    <tr>
                        <p style={{fontWeight: "bolder",fontSize:"18px"}}>Phone no : </p>
                        <p> 123 987 887 765</p>
                    </tr>
                    <br></br>
                    <tr>
                        <p style={{fontWeight: "bolder",fontSize:"18px"}}>Address : </p>
                        <p>212,7th cross,Prajapat road,bengaluru,560001</p>
                    </tr>
                </table>
                </div>

            </div>

        </div>
        </>
    )
}