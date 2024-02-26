import { Layout } from "./Layout";
import { Carousel } from "../Home/Carousel";
import { Footer } from "../Home/Footer";
import { NewNotice } from "./NewNotice";

export function Home(){
    return(
        <>
        <div><Layout/></div>
        <div>
        <Carousel/>
        </div>
        <div>
        <NewNotice/>
        </div>
        <div>
        <Footer/>

        </div>
        </>
    )
}