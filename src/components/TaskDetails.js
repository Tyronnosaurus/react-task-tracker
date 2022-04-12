import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from './Button'


function TaskDetails() {

    // Stateful data -> We use useStateHook so that UI updates when data changes
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})

    // Router params
    // In App.js, we define      <Route path='/task/:id'...
    // Then in Task.js we define <Link to={`/task/${task.id}`}>...  --> For example, /task/4
    // The id can then be fetched by useParams:
    const params = useParams()

    //
    const navigate = useNavigate()


    // Function to fetch the task's info
    const fetchTask = async () => {
        const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
        const data = await res.json()
        
        // If task of given id is not found, navigate to main page
        if (res.status === 404) navigate('/')

        setTask(data)
        setLoading(false)
    }

    useEffect(
        () => { fetchTask() },
        []  // No dependencies -> Execute only once when component loads
    )



    return loading ? (<h3>Loading...</h3>) :
        (<div>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
            <Button text='Go back' onClick={ () => navigate(-1) }/>
        </div>)

}

export default TaskDetails