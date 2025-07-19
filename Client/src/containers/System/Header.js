import React, { useState } from "react";
import { Navigation } from "../public";
import { Menu } from "lucide-react"; // hoặc dùng bất kỳ icon nào bạn muốn

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full flex items-center justify-between h-[50px] fixed top-0 left-0 z-50 bg-secondary1 shadow-md md:px-8 transition-all duration-300">
    
      <div className="font-bold bg-secondary1 text-white px-4 py-2 rounded-md">
        EZROOM.PA#N
      </div>

   
      <div className="hidden md:block flex-grow">
        <Navigation isAdmin={true} />
      </div>

      <button
        className="md:hidden "
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <Menu size={24} />
      </button>

   
      {showMenu && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md z-40 md:hidden animate-slide-down">
          <Navigation isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default Header;
