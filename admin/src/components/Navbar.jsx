import { assets } from '../assets/admin_assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <nav className='flex justify-between items-center py-2 px-[4%]'>
      <img src={assets.logo} alt="logo" className='w-[max(10%,80px)]' />
      <button
        onClick={() => setToken('')}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 
        rounded-2xl text-xs sm:text-sm hover:bg-gray-900 transition-all ease duration-300'
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar