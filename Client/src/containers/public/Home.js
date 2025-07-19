import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import {Intro,Contact} from "../../components";
import Search from "./Search";
import { useSelector,useDispatch } from "react-redux";
import ImageSlider from "../../components/ImageSlider";
import { useEffect } from "react";
import * as actions from '../../store/actions';
import Footer from "./Footer";
const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
 
    return (

        <div className="w-full flex gap-4 flex-col items-center min-h-screen">
            <Header />

            <Navigation />
            <Search />
          
            
            <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3 bg-white ">
                {/* ra màn hình */}
                <Outlet />

            </div>
            <Intro />
            <Contact />
             <Footer />

        </div>
        
    )
}
export default Home;
