import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import React from 'react'


const Task = ({task, onDelete, onToggle}) => {

    // Build class string (so that CSS get applied correctly)
    let className = 'task'
    className += `${task.reminder ? ' reminder' : ''}`    // `` are used to insert variables into strings with ${}

    return(
        <div className={className} onDoubleClick={()=>onToggle(task.id)}>
            <h3>
                {task.text}
                <FaTimes style={{color:'red', cursor:'pointer'}}
                         onClick={()=>onDelete(task.id)}/>  {/*Close button X*/}
            </h3>
            <p>{task.day}</p>
            <p><Link to={`/task/${task.id}`}>View details</Link></p>
        </div>
    )

}


export default Task