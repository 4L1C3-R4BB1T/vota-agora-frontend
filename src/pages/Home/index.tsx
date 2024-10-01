import Header from "@/core/components/Header";
import { Outlet } from "react-router-dom";

function Home() {
    return (
        <div>
            <Header/>
            <div className="p-5">
               <Outlet/>
            </div>
        </div>
    );
}


export default Home;