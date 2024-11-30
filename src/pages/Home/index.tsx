import Footer from "@/core/components/Footer";
import Header from "@/core/components/Header";
import useAuth from "@/core/hooks/useAuth";
import { Outlet } from "react-router-dom";

function HomePage() {
    const { payload } = useAuth();
    if (!payload) {
        return null;
    }
    return (
        <div>
            <Header/>
            <div className="p-5 bg-gray-200 bg-opacity-50">
               <Outlet/>
            </div>
            <div className="pt-5 bg-gray-200 bg-opacity-50">
                <Footer/>
            </div>
        </div>
    );
}


export default HomePage;