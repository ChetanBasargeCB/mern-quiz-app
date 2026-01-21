import React, { use, useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi"
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import login from '../assets/login.avif'
import { loginStyles } from '../assets/dummyStyle'



const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState('')
  const[error,setError]=useState({})
  const[loading,setLoading]=useState(false);
  const[submiterror,setSubmiterrro]=useState('')
  
  const navigate = useNavigate()
 

  // Email & Password Validation
  const validate = ()=>{
    const e={};
    //Email Validation
    if(!email) e.email ="Email is Requried" 
    // mail type checking
    else if(!isValidEmail (email)) e.email = "please enter valid email"
    if(!password) e.password = "Password is Required"
    return e
  }
  const handelEmail = (e)=>{
    setEmail(e.target.value)
    if(error.email){
     setError((prev)=>({
      ...prev,
      email:undefined
     }))
    }
  }

  const hadelPassword = (e)=>{
    setPassword(e.target.value)
    if(error.password){
      setError((prev)=>({
          ...prev,
          password:undefined
      }))
    }
  }
  // Backend Connection (API Testing)
 const BackendAPI = "http://localhost:3000"
  const handelSubmit= async (e)=>{
    e.preventDefault()
    setSubmiterrro('')
    const validation = validate();
    setError(validation);
    if(Object.keys(validation).length) return;
    setLoading(true) 
    try {
      const payload = {email:email.trim().toLocaleLowerCase(),password}
      const resp = await fetch(`${BackendAPI}/api/auth/login`,{method:"POST",
        headers: {
      "Content-Type": "application/json"
       },
        body: JSON.stringify(payload)
     })
      let data = null
      try{
        data = await resp.json()
      } catch(e){
        //ignore for now
      }
      
      if(!resp.ok){
        const msg = data.message || "login failed";
        setSubmiterrro(msg);
        return;
      }

      // Storing token in localStorages
      if(data.token){
        try{
          // token storing 
          localStorage.setItem('authtoken',data.token);
          localStorage.setItem(
            'currentuser',
            JSON.stringify(data.user ||{email:payload.email})
          )
          // console.log("Token:", localStorage.getItem("authtoken"));
          // console.log("User:", JSON.parse(localStorage.getItem("currentuser")));

        }
        catch(err){
        
        }
      }
      const user = data.user || {email:payload.email}
      window.dispatchEvent(
        new CustomEvent('authchanged',{detail:{user}})
      )
      // if login is successful navigate to the home page
      if(typeof onloginsuccess==='function') onloginsuccess(user)
       navigate("/",{replace:true})
    } catch (err) {
        console.log("Frontend login error",err)
        setSubmiterrro("Network error")
    }
    finally{
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-300" noValidate>
      
      {/* Left Image Section */}
      <div className="hidden md:flex items-center justify-center">
        <img 
          src={login} 
          alt="Login" 
          className="w-3/5 rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Login to continue to your account
          </p>

          <form className="space-y-5" onSubmit={handelSubmit} >
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email" value={email} onChange={handelEmail}
                placeholder="your@example.com"
                className={`${error.email? " border-red-500":""} w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              {error.email && (
                <p className={loginStyles.errorText} >{error.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input value={password} onChange={hadelPassword}
                  type={showPass ? "text" : "password"}
                  placeholder=" your password@123"
                  className={`${error.password?"border-red-500":""} w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              <div>
                {
                  error.password &&(
                    <p className={loginStyles.errorText}>{error.password}</p>
                  )
                }
              </div>

              {
                submiterror && (
                  <p className={loginStyles.submitError}> {submiterror }</p>
                )
              }
            </div>
              <button 
              type='submit' disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                {
                  loading?
                    <span>...Sign in</span>:<span>Login</span>
                  
                }
              </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>

          <div className="flex justify-center mt-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              <FaArrowLeftLong /> Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
