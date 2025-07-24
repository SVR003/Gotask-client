import React from 'react'
import TasksCard from './TasksCard'


const InProgress = ({task}) => {
  return (
    <div className='flex gap-10'>
        {task && task.map((items, i) => <TasksCard key={i} data={items}/>)}
    </div>
  )
}

export default InProgress