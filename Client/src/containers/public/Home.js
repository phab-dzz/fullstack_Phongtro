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
const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch=useDispatch();
    useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 1000)
  }, [isLoggedIn])
    return (

        <div className="w-full flex gap-4 flex-col items-center min-h-screen">
            <Header />

            <Navigation />
           {isLoggedIn && <Search />} 
          
            
            <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3 ">
                {/* ra màn hình */}
                <Outlet />

            </div>
            <Intro />
            <Contact />
            {/* <div className="h-[500px]">

            </div> */}

        </div>
    )
}
export default Home;
