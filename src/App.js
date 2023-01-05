import React, { useState, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 

import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from './components/TaskDetails';


function App() {

  // useState hook so that UI updates when we add/delete/modify tasks
  const [tasks, setTasks] = useState([]);

  // useState hook to update UI when toggling visibility of 'Add Task' form
  const [showAddTask, setShowAddTask] = useState(false);



  //// Load tasks on page load
  // useEffect hook performs side effects in components (e.g. fetching data)
  useEffect( () => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },
  []  //No dependencies -> useEffect runs only once on page load
)

  

  // Fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch('/tasks')
    const data = await res.json()
    return(data)
  }


  // Fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`/tasks/${id}`)
    const data = await res.json()
    return(data)
  }


  // Add task
  const addTask = async (task) => {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    // Convert to JSON (since our server uses a JSON file as a database)
    const data = await res.json()

    //
    setTasks([...tasks, data])

    //Hide form
    setShowAddTask(false)
  }



  // Delete task
  const deleteTask = async (id) => {
    await fetch(`/tasks/${id}`, {
      method: 'DELETE'
    })

    // This filter deletes the task(s) with the specified id
    setTasks(tasks.filter(
      (task) => task.id !== id
    ))
  }


  // Toggle reminder on double click
  const toggleReminder = async (id) => {

    // Fetch task from db onto an aux var
    const taskToToggle = await fetchTask(id)
    // Toggle the reminder on the aux var
    const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}
    
    // Save it back into the db
    const res = await fetch(`/tasks/${id}`, {
      method:'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updTask)
    })

    // Fetch response as json (used to update UI)
    const data = await res.json()

    // Update UI
    // map runs function for each task -> If task has specified id, replaces 'reminder'
    // value with that from 'data'
    setTasks(
      tasks.map(
        (task) => task.id===id ? {...task, reminder: data.reminder} : task
      )
    )
  }


  return (
    // Note: We can only return one html element
    <Router>
      <div className="container"> {/* Note: In React, we use 'className' instead of 'class' */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}  />
        
        <Routes>
          <Route path='/' element={
            <>
              {showAddTask ? <AddTask onAdd={addTask} /> : ''}
              {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                : 'No tasks to show'}
            </>
          }/>
          <Route path='/about' element={<About />}/>
          <Route path='/task/:id' element={<TaskDetails />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  )

}

export default App;
