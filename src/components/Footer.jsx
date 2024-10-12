import { Link } from "react-router-dom"
import { assets } from "../assets/frontend_assets/assets"

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-6 sm:gap-14 mt-20 sm:mt-40 text-sm">
        <div className="">
          <Link to='/'>
            <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, molestias rerum. Quaerat ipsa voluptatem sed perspiciatis placeat doloribus. Reprehenderit error libero rem nihil officia neque natus nostrum architecto atque numquam.
          </p>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-1 sm:mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy policy</li>
          </ul>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-1 sm:mb-5">Get in touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer">+1-212-456-7890</li>
            <li className="cursor-pointer">contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div className="mt-5 sm:mt-10">
          <hr />
          <p className="py-5 text-sm text-center">
          © Copyright 2024 forever.com - All rights reserved
          </p>
        </div>
    </footer>
  )
}

export default Footer