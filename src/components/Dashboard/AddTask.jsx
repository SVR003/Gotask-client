import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddTask = ({setAddTaskDiv}) => {
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('low')
    const [status, setStatus] = useState('notStarted')
    const [description, setDescription] = useState('')


  const addTask = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:3000/api/tasks/add-task",
      { title, priority, status, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(res.data.success); 
    setAddTaskDiv("hidden");
    setTitle('');
    setDescription('');
    setStatus('notStarted');
    setPriority('low');
  } catch (error) {
    toast.error(error?.response?.data?.error || "Something went wrong");
  }
};


  return (
    <div className='bg-white rounded px-4 py-4 w-[40%]'>
        <h1 className='text-center font-semibold text-xl'>Add Task</h1>
        <hr className='mb-4 mt-2'/>
        <form className='flex flex-col gap-4'>
            <input type="text" className='border px-2 py-1 rounded border-zinc-300 outline-none' placeholder='Title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className='flex items-center justify-between gap-4'>
                <div  className='w-full'>
                    <h3 className='mb-2 '>Select Priority</h3>
                    <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)} id="" className='border px-2 py-1 border-zinc-300 outline-none w-full'>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div  className='w-full'>
                    <h3 className='mb-2 '>Status</h3>
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} id="" className='border px-2 py-1 border-zinc-300 outline-none w-full'>
                        <option value="notStarted">Not Started</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                
            </div>
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="" placeholder='Description' className='border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]'>
                </textarea>
                <div className='flex items-center justify-between gap-4'>
                    <button className='w-[150px] border-black border-2 py-2 bg-white hover:bg-red-600 hover:text-white transition-all duration-300 text-black rounded cursor-pointer' onClick={()=> setAddTaskDiv("hidden")}>Cancel</button>
                    <button className='w-[150px] bg-yellow-600 py-2 hover:bg-yellow-500  transition-all duration-300 text-white rounded cursor-pointer' onClick={addTask}>Add Task</button>
                    
                </div>
        </form>
    </div>
  )
}

export default AddTask