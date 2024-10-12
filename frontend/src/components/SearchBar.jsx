import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {

  const {search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    }
    else {
      setVisible(false);
    }
  }, [location])
  

  return showSearch && visible ? (
    <div className="bg-gray-50/0 text-center flex justify-center items-center">
      <div 
        className="inline-flex items-center justify-center border
      border-gray-700 my-5 mx-5 rounded-full w-3/4 sm:w-1/2 pr-5"
      >
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          type="text" 
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm max-w-full py-2 px-5"
        />
        <img src={assets.search_icon} alt="search-icon" className="w-4" />
      </div>
      <img
      onClick={()=>setShowSearch(false)}
        src={assets.cross_icon} 
        alt="cross-icon" 
        className="inline w-3 cursor-pointer"/>
    </div>
  ) : null
}

export default SearchBar