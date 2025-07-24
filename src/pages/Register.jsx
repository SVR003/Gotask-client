import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/api/user/register", {username, email, password})
            toast.success(res.data.success)
            navigate("/login")
            
        } catch (error) {
            toast.error(error.response.data.error)
            
        }
    }
  return (
   
    <div className='flex h-screen flex-col items-center justify-center'>
        <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
            <h1 className='text-3xl mb-1 text-yellow-600 font-bold text-center'>GoTask</h1>
            <h3 className='text-center text-blue-400 '>Create an Account</h3>
        </div>
        <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4 '>
            <form className='flex flex-col gap-4 items-center'>
                <input type="text" required placeholder='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} className='border rounded px-4 py-1 outline-none w-[75%] '/>
                <input type="email" required placeholder='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded px-4 py-1 outline-none w-[75%]'/>
                <input type="password" required placeholder='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='border rounded px-4 py-1 outline-none w-[75%]'/>
                <button className='text-white bg-blue-700 py-2 text-center w-[20%] rounded px-4 cursor-pointer hover:bg-blue-600 font-bold ' onClick={handleSubmit}>Register</button>
                <p className='text-zinc-800 text-center font-semibold'>Already have an account? <Link to="/login" className='text-blue-700 cursor-pointer hover:text-blue-600 hover:font-bold font-semibold'>Login</Link></p>
            </form>
        </div>
    </div>
   
)}

export default Register