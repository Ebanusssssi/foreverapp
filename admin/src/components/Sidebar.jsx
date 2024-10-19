import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink 
          to="/add" 
          className={`flex items-center gap-3 border
                  border-gray-300 border-r-0 px-3 py-2 rounded-xl rounded-tr-none rounded-br-none  
                    [box-shadow:2px_2px_4px_#d0d0d0,_-1px_-1px_4px_#f0f0f0]
                    hover:bg-green-500 hover:text-white transition-all ease duration-100 group 
                    ${location.pathname.includes('add') ? 'bg-green-500 text-white' : ''}`}
        >
          <img src={assets.add_icon} alt="add-icon" className={`w-5 h-5 hover:filter group-hover:invert transition-all ease duration-100 ${location.pathname.includes('add') ? 'invert' : ''}`} />
          <p className='hidden md:block font-semibold text-sm'>Add Items</p>
        </NavLink>
        <NavLink 
          to="/list" 
          className={`flex items-center gap-3 border
                  border-gray-300 border-r-0 px-3 py-2 rounded-xl rounded-tr-none rounded-br-none  
                    [box-shadow:2px_2px_4px_#d0d0d0,_-1px_-1px_4px_#f0f0f0]
                  hover:bg-yellow-500 hover:text-white transition-all ease duration-100 group
                  ${location.pathname.includes('list') ? 'bg-yellow-500 text-white' : ''}`}
        >
          <img src={assets.order_icon} alt="add-icon" className={`w-5 h-5 hover:filter group-hover:invert transition-all ease duration-100 ${location.pathname.includes('list') ? 'invert' : ''}`} />
          <p className='hidden md:block font-semibold text-sm'>List Items</p>
        </NavLink>
        <NavLink 
          to="/orders" 
          className={`flex items-center gap-3 border
                  border-gray-300 border-r-0 px-3 py-2 rounded-xl rounded-tr-none rounded-br-none  
                    [box-shadow:2px_2px_4px_#d0d0d0,_-1px_-1px_4px_#f0f0f0]
                    hover:bg-sky-500 hover:text-white transition-all ease duration-100 group
                    ${location.pathname.includes('orders') ? 'bg-sky-500 text-white' : ''}`}
        >
          <img src={assets.order_icon} alt="add-icon" className={`w-5 h-5 hover:filter group-hover:invert transition-all ease duration-100 ${location.pathname.includes('orders') ? 'invert' : ''}`} />
          <p className='hidden md:block font-semibold text-sm'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar