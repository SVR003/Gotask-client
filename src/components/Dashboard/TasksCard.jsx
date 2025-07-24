import axios from 'axios';
import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';



const TasksCard = ({data, editTaskId}) => {
  const showEditDiv = (e, id) => {
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId", id)
    window.location.reload()
  }

  const deleteTask = async (e, id) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated");
    return;
  }

  try {
    const res = await axios.delete(`http://localhost:3000/api/tasks/delete-task/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(res.data.success);
    window.sessionStorage.removeItem("editTaskId")
    window.location.reload()

  } catch (error) {
    console.log(error);
    
    toast.error(error?.response?.data?.error || "Something went wrong");
  }
};

  return (
    <div className='bg-white  px-5 w-[350px] py-4 rounded-2xl hover:shadow transition-all duration-200'>
        <div className='flex items-center justify-between'>
            <h1 className=''>{data.title}</h1>
            <div className={`text-sm ${data.priority === "low"? "text-green-500 bg-green-100" : data.priority === "medium" ? "text-orange-500 bg-orange-100" : "text-red-500 bg-red-100" } px-2 rounded-full`}><p>{data.priority}</p></div>
        </div>
        <hr className='my-2'/>
        <p className='text-sm text-zinc-500 text-start'>{data.description}</p>
        <div className='flex justify-end gap-7 mt-4'>
          <button className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={(event) => showEditDiv(event,data._id)}><FaRegEdit size={19} /></button>
          <button className="text-red-600 hover:text-red-800 cursor-pointer" onClick={(e)=> deleteTask(e,data._id)}><MdDeleteForever size={19} /></button>
        </div>
        
    </div>
  )
}

export default TasksCard