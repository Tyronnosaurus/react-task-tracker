import Task from "./Task"
import React from 'react'

const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
    <>
        {/* map() calls the specified arrow function once for each item in the array */}
        {tasks.map(
            (task) => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onDelete={onDelete} 
                    onToggle={onToggle}/>
            )
        )}
    </>
  )
}


export default Tasks