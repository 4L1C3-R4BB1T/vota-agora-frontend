import Footer from "@/core/components/Footer";
import Header from "@/core/components/Header";
import { Outlet } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <Header/>
            <div className="p-5">
               <Outlet/>
            </div>
            <div className="pt-5">
                <Footer/>
            </div>
        </div>
    );
}


export default HomePage;