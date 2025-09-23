import { useEffect, useRef, useState } from "react"
import { SquarePen, Trash } from 'lucide-react'
import type { FormEvent } from 'react'
import WeatherService from "../services/weather-service"
import TodoListServices from "../services/todoList-service"
import type { Task } from "../types/task"
import { useNavigate } from "react-router-dom"
import authentificationService from "../services/authentification-service"


function TodoList() {

  type WeatherData = {
    name: string
    main: {
      temp: number
    }
    sys: {
      country: string
    }  
  }

  const [weather, setWeather] = useState<WeatherData>()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string>()
  const [meteoError, setmeteoError] = useState<string>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [completed, setCompleted] = useState<number>(0)
  const [newTask, setNewTask] = useState<Task>()
  const inputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate();


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")
    addTask(newTask)
    setNewTask({ id: '', title: '', completed: false })
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleEdit = (task: Task) => {
    setNewTask(task);
    setIsEditing(true);
    focusInput();
  }

  const deleteTask = (id: string) => {
    TodoListServices.deleteTask(id).then(
      data => data && setTasks(data)
    )
  }

  const addTask = (task?: Task) => {
      if (task && typeof task.title === 'string' && task.title.trim() !== "")  {
        isEditing ? TodoListServices.updateTask(task.id, task).then((task) => {
          setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? task : t))
        }) 
        : TodoListServices.addTask(task).then((task) => {
          setTasks(prevTasks => [...prevTasks, task])
        })
        navigate('/todolist')
        console.log(newTask)
      }
       else {
        setError("Veuillez écrire la tâche")
    }
  }

  const taskStatus = (id: string) => {
    setTasks(prevTasks => 
    prevTasks.map(task => {
      if (task.id === id) {
        TodoListServices.updateTask(task.id, { ...task, completed: !task.completed })
      }
      return task
    })
  );
  }

useEffect(() => {
  const fetchMeteoData = async () => {
    try {
      const data = await WeatherService.getWeather()
      setWeather(data)
    } catch (err) {
      console.error(err)
      setmeteoError("Impossible de récupérer la météo. Vérifier votre connexion")
    } finally {
      setLoading(false)
    }
  }

    fetchMeteoData()
    TodoListServices.getTasks().then(data => setTasks(data))
    const interval = setInterval(fetchMeteoData, 120000)
    return () => clearInterval(interval)
  }, [tasks])

  useEffect(() => {
    setCompleted(tasks.filter(task => task.completed).length)
  }, [tasks])

  return (
    <>
      <div className="flex flex-col m-auto md:max-w-3xl min-h-screen">
        <div className="p-4 mt-2">
          <div className="card flex flex-col md:flex-row justify-between shadow-md p-4 rounded-lg 
            bg-base-100 text-black">
            <div className="">
              <h2 className="text-xl text-primaryColor font-bold mb-4">Planning</h2>
              <p>{weather ? (`${weather.main.temp} °C, ${weather.name}-${weather.sys.country}`) : meteoError}</p>
              <p>{loading && ("Chargement...")}</p>
              <p>Progression: {tasks.length === 0 ? 0 : ((completed/tasks.length)*100).toFixed(2)}%</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div
                className="radial-progress text-primary/10"
                style={{
                  '--value': 100,
                  '--size': '8rem',
                  '--thickness': '10px'
                } as React.CSSProperties}
                role="progressbar"
              >
                <div
                  className="radial-progress text-primary border-none"
                  style={{
                    '--value': tasks.length === 0 ? tasks.length : (completed/tasks.length)*100,
                    '--size': '8rem',
                    '--thickness': '10px'
                  } as React.CSSProperties}
                  role="progressbar"
                >
                  <div className="text-center text-primaryColor">
                    <span className="text-4xl font-bold">{completed}</span>
                    <span className="text-xl opacity-70">/{tasks.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <p className="text-center">{error}</p>
        )}
        

        {/* Form */}
        <div className="p-4">
          <form className="my-2 flex shadow-md rounded-lg bg-base-100 text-black" 
          onSubmit={handleSubmit}>
            <input
              type="text"
              ref={inputRef}
              value={newTask?.title ?? ''}
              className="w-full px-4 text-lg outline-none rounded-l-lg"
              onChange={(e) => setNewTask(isEditing && newTask ? { ...newTask, title: e.target.value } : { id: Date.now().toString(), title: e.target.value, completed: false })}
            />
            <button
              className="text-2xl text-white font-bold px-6 py-4 font-bold bg-primary border-none rounded-r-[10px] cursor-pointer"
            >
              +
            </button>
          </form>
        </div>

        {/* Task list */}
        <div className="p-4">
          <ul className="list bg-base-100 text-black rounded-xs shadow-md">
            {
              tasks && tasks.length > 0 ? (
                <>
                  <li className="p-4 text-xs opacity-60 tracking-wide">Listes des tâches</li>
                  {tasks?.map((task, index) => (
                  <li className="list-row flex md:flex-row justify-between flex-wrap" key={index}>
                    <div className="flex justify-start gap-2">
                      <div><input type="checkbox" checked={task.completed} onChange={() => {
                        taskStatus(task.id)
                        //setCompleted(tasks.filter(task => task.completed).length)
                      }}
                        className="checkbox bg-base-100 text-black" /></div>
                      <div>
                    
                        <div>{task.title}</div>
                      </div>
                    </div>
                    <div className="">
                      <button onClick={() => {handleEdit(task)}} className="btn btn-ghost btn-square">
                        <SquarePen className="h-5 w-5"/>
                      </button>
                      <button className="btn btn-ghost btn-square" onClick={() => deleteTask(task.id)}>
                        <Trash className="h-5 w-5"/>
                      </button>
                    </div>
                  </li>
                  ) 
                )
                }
                </>  
              ) : (
                <div className="p-4 text-center">
                  <p>Aucune tâche pour le moment</p>
                </div>
              )
            }
          </ul>
        </div>
    </div>
    </>
  )
}

export default TodoList
