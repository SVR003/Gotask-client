import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const EditTask = ({setEditTaskDiv, editTaskId}) => {

    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('low')
    const [status, setStatus] = useState('notStarted')
    const [description, setDescription] = useState('')



    useEffect(() => {
  if (!editTaskId) return; 

  const fetch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tasks/get-task/${editTaskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const task = res.data.taskDetails;
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    } catch (error) {
      console.log(error);
    }
  };

  fetch();
}, [editTaskId]); 

  const editTask = async (e, id) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User not authenticated");
    return;
  }

  try {
    const res = await axios.put(`http://localhost:3000/api/tasks/edit-task/${editTaskId}`,
      { title, priority, status, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(res.data.success);
    window.sessionStorage.clear("editTaskId")
    setEditTaskDiv("hidden");
    window.location.reload()
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
        <h1 className='text-center font-semibold text-xl'>Edit Task</h1>
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
                    <button className='w-[150px] border-black border-2 py-2 bg-white hover:bg-red-600 hover:text-white transition-all duration-300 text-black rounded cursor-pointer' onClick={(event)=>{event.preventDefault(); window.sessionStorage.clear("editTaskId"); setEditTaskDiv("hidden")}}>Cancel</button>
                    <button className='w-[150px] bg-yellow-600 py-2 hover:bg-yellow-500 cursor-pointer  transition-all duration-300 text-white rounded' onClick={(e)=>editTask(e,editTaskId)}>Edit Task</button>
                    
                </div>
        </form>
    </div>
  )
}

export default EditTask