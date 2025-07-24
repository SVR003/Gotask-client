import React, { useEffect, useState } from 'react'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import Sections from '../components/Dashboard/Sections'
import NotStarted from '../components/Dashboard/NotStarted'
import InProgress from '../components/Dashboard/InProgress'
import Completed from '../components/Dashboard/Completed'
import axios from 'axios'
import EditTask from '../components/Dashboard/EditTask'

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("hidden")
  const [tasks, setTasks] = useState()
  const [editTaskDiv, setEditTaskDiv] = useState("hidden")
  const [editTaskId, setEditTaskId] = useState()
  const [filter, setFilter] = useState("all") 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/user-details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setTasks(res.data.tasks)
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserDetails()

    if (window.sessionStorage.getItem("editTaskId")) {
      setEditTaskDiv("block");
      setEditTaskId(window.sessionStorage.getItem("editTaskId"))
    }
  }, [tasks])

  const renderFilteredTasks = () => {
    if (!tasks) return null;

    const notStarted = tasks[0]?.notStarted || [];
    const inProgress = tasks[1]?.inProgress || [];
    const completed = tasks[2]?.completed || [];

    if (filter === "notStarted") {
      return (
        <>
          <Sections title={"Not Started"} />
          <div className="flex flex-wrap gap-4">
            <NotStarted task={notStarted} />
          </div>
        </>
      );
    }

    if (filter === "inProgress") {
      return (
        <>
          <Sections title={"In Progress"} />
          <div className="flex flex-wrap gap-4">
            <InProgress task={inProgress} />
          </div>
        </>
      );
    }

    if (filter === "completed") {
      return (
        <>
          <Sections title={"Completed"} />
          <div className="flex flex-wrap gap-4">
            <Completed task={completed} />
          </div>
        </>
      );
    }

    const allTasks = [
      ...(notStarted.map(task => ({ ...task, status: "notStarted" }))),
      ...(inProgress.map(task => ({ ...task, status: "inProgress" }))),
      ...(completed.map(task => ({ ...task, status: "completed" })))
    ];

    return (
      <div className="flex flex-wrap gap-4">
        {allTasks.map((task, index) => {
          if (task.status === "notStarted") return <NotStarted key={task._id || index} task={[task]} />;
          if (task.status === "inProgress") return <InProgress key={task._id || index} task={[task]} />;
          if (task.status === "completed") return <Completed key={task._id || index} task={[task]} />;
          return null;
        })}
      </div>
    );
  }

  return (
    <div className='w-full relative'>
      <div className='bg-white'>
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      <div className='px-12 py-4 bg-zinc-100 flex justify-end'>
        <select
          className='px-3 py-2 border rounded'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="notStarted">Not Started</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className='px-12 py-4  bg-zinc-100 min-h-[89vh] max-h-auto'>
        {renderFilteredTasks()}
      </div>

      <div className={`w-full ${addTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className={`w-full ${addTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>

      <div className={`w-full ${editTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className={`w-full ${editTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
        <EditTask editTaskId={editTaskId} setEditTaskDiv={setEditTaskDiv} />
      </div>
    </div>
  )
}

export default Dashboard
