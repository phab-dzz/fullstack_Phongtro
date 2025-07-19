import React from "react";
import {useSelector} from "react-redux";
import { Navigate,Outlet } from "react-router-dom";
import {path} from "../../utils/constant";
import { Header,Sidebar } from "./";

const System = () => {
    const {isLoggedIn} = useSelector(state => state.auth);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    if (!isLoggedIn) {
        return <Navigate to={path.HOME} replace={true} />;
    }
    return (
        <>
       <div className="fixed top-0 left-0 w-full h-[50px] z-50">
  <Header />
</div>
<div className="flex w-full h-screen pt-[50px]">
  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  <main className="flex-1 bg-white shadow-md p-4 overflow-y-auto">
    <Outlet />
  </main>
</div>

        </>
    );

}
export default System;