import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from './Button'


function TaskDetails() {

    // Use useState hook so that UI updates when certain data changes
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})

    // Router params
    // In App.js, we define      <Route path='/task/:id'...
    // Then in Task.js we define <Link to={`/task/${task.id}`}>...  --> For example, /task/4
    // The id can then be fetched by useParams:
    const params = useParams()

    // useNavigate returns a function to navigate programatically
    const navigate = useNavigate()

    
    // useEffect hook to fetch task on load
    useEffect(
        () => {
                // Function to fetch the task's info
                const fetchTask = async () => { 
                    const res = await fetch(`/tasks/${params.id}`)
                    const data = await res.json()
                    
                    // If task of given id is not found, navigate to main page
                    if (res.status === 404) navigate('/')
            
                    setTask(data)
                    setLoading(false)
                }
                fetchTask()
            },
        [params, navigate]
    )



    return loading ? (<h3>Loading...</h3>) :
        (<div>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
            <Button text='Go back' onClick={ () => navigate(-1) }/>
        </div>)

}

export default TaskDetails