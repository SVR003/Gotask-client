import React from 'react'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import axios from 'axios'
import { LuLogOut } from "react-icons/lu";

const Header = ({ setAddTaskDiv}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/user/logout");
            toast.success(res.data.message)
            localStorage.removeItem("token")
            navigate("/login")
        } catch (error) {
            console.log(error);
            toast.error("Logout failed");
        }
    }
  return (
    <div className='flex px-12 py-4 items-center justify-between border-b'>
        <div>
            <h1 className='text-2xl text-yellow-600 font-semibold'>GoTask</h1>
        </div>
        <div className='flex gap-8'>
            <button className='hover:text-white hover:bg-yellow-500 transition-all duration-300 cursor-pointer border-none text-white bg-yellow-600 rounded px-3 py-1' onClick={() => setAddTaskDiv("block")}> Add Task</button>
            <button className='hover:text-red-700 transition-all duration-300 cursor-pointer ]' onClick={handleLogout}> <LuLogOut size={23} /></button>
        </div>
    </div>
  )
}

export default Header