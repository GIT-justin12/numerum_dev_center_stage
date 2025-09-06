import { useEffect, useState } from "react"
import { SquarePen, Trash } from 'lucide-react'
import type { FormEvent } from 'react'
import WeatherService from "../services/weather-service"
import { useTheme } from "../context/ThemeContext"


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

  type Task = {
    id: number
    name: string
    completed: boolean
  }

  const [weather, setWeather] = useState<WeatherData>()
  const [loading, setLoading] = useState(true)
  const [taskInput, setTaskInput] = useState<string>("")
  const [error, setError] = useState<string>()
  const [meteoError, setmeteoError] = useState<string>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [completed, setCompleted] = useState<number>(0)

  const { theme } = useTheme()


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTask(taskInput, tasks)
  }

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const addTask = (taskInput: string, tasks: Task[]) => {
     if (taskInput.trim()) {
      setTasks([...tasks, {id: Date.now(), name: taskInput, completed: false}])
      setTaskInput("")
    } else {
        setError("Veuillez écrire la tâche")
    }
  }

  const taskStatus = (id: number) => {
    const task = tasks.find(task => task.id === id)
    if (task) {
        task.completed = !task.completed
         console.log(tasks)
    }
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
    const interval = setInterval(fetchMeteoData, 120000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="flex flex-col m-auto md:max-w-3xl min-h-screen">
        <div className="p-4 mt-2">
          <div className={`card flex flex-col md:flex-row justify-between shadow-md p-4 rounded-lg 
            ${ theme ? "bg-base-100 text-black" : "bg-neutral-500 text-white"}`}>
            <div className="">
              <h2 className="text-xl text-primaryColor font-bold mb-4">Planning</h2>
              <p>{weather && (`${weather.main.temp} °C, ${weather.name}-${weather.sys.country}`)}</p>
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
          <form className={`my-2 flex shadow-md rounded-lg ${ theme ? "bg-base-100 text-black" : "bg-neutral-500 text-white"}`} 
          onSubmit={handleSubmit}>
            <input
              type="text"
              value={taskInput}
              className="taskInput w-full px-4 text-lg outline-none rounded-l-lg"
              onChange={(e) => setTaskInput(e.target.value)}
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
          <ul className={`list ${ theme ? "bg-base-100 text-black" : "bg-neutral-500 text-white"} rounded-xs shadow-md`}>
            {
              tasks && tasks.length > 0 ? (
                <>
                  <li className="p-4 text-xs opacity-60 tracking-wide">Listes des tâches</li>
                  {tasks?.map((task, index) => (
                  <li className="list-row flex md:flex-row justify-between flex-wrap" key={index}>
                    <div className="flex justify-start gap-2">
                      <div><input type="checkbox" onChange={() => {
                        taskStatus(task.id)
                        setCompleted(tasks.filter(task => task.completed).length)
                      }}
                        className={`checkbox ${ theme ? "bg-base-100 text-black" : "bg-neutral-500 text-white"}`} /></div>
                      <div>
                    
                        <div>{task.name}</div>
                      </div>
                    </div>
                    <div className="">
                      <button className="btn btn-ghost btn-square">
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
