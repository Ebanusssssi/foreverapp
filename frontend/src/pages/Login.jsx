import { useState } from "react"

const Login = () => { 
  const [currentState, setCurrentState] = useState('Sign up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 
      gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
      </div>
      {currentState === 'Login' 
      ? '' 
      : <input 
        type="text" 
        placeholder="Name" 
        required 
        className="w-full px-3 py-2 border border-gray-800"
        />
      }

      <input 
        type="email" 
        placeholder="Email" 
        required 
        className="w-full px-3 py-2 border border-gray-800"
      />
      <input 
        type="password" 
        placeholder="Password" 
        required 
        className="w-full px-3 py-2 border border-gray-800"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] px-2">
        <p className="cursor-pointer text-gray-300 hover:text-gray-500">Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign up')} className="cursor-pointer text-gray-300 hover:text-gray-500">Create account</p>
          : <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-gray-300 hover:text-gray-500">Login</p>
        }
      </div>
      <button
        
        className="bg-black text-white font-light px-8 py-2 mt-4 rounded-md"
      >
        {currentState === 'Login' ? 'Sign in' : 'Sign up'}
      </button>
    </form>
  )
}

export default Login