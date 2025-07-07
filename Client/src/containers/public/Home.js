import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import {Intro,Contact} from "../../components";
import Search from "./Search";
const Home = () => {
    return (

        <div className="w-full flex gap-4 flex-col items-center min-h-screen">
            <Header />

            <Navigation />
            <Search />

            <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3 ">
                {/* ra màn hình */}
                <Outlet />

            </div>
            <Intro />
            <Contact />
            <div className="h-[500px]">

            </div>

        </div>
    )
}
export default Home;
