import { useState } from "react"
import axios from 'axios'
import { backendUrl } from "../App"
import { toast } from "react-toastify"

const Login = ({ setToken }) => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
      if (response.data.success) {
        setToken(response.data.token)
        toast.success('Welcome :)')
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="bg-white px-8 py-6 max-w-md rounded-lg [box-shadow:2px_2px_4px_#d0d0d0,_-1px_-1px_4px_#f0f0f0]">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" />
          </div>
          <button type="submit" className="mt-2 w-full py-2 px-4 rounded-md text-white bg-gray-900 hover:bg-green-400 transition-all ease duration-300">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login