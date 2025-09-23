// Constant
const lat = 6.16667
const lon = 1.21667
const apiKey = API_KEY
const addBtn = document.querySelector(".btn")
const taskInput = document.querySelector('.taskInput')
const taskCompterContent = document.querySelector(".task_compter")
const alert = document.querySelector(".alert")

// Variables
let tasks = []
let completedTasks = 0
let editingTask = null
let totalTasks = 1
let meteoInfo
let lastMeteoMessage = ''
let tasksList = document.querySelector(".tasksList")
let taskCompter = document.createElement("div")
let levelInfo = document.querySelector(".level_info")

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addTask(taskInput, tasks)
    taskProgression(tasks, completedTasks, totalTasks)
})

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    taskCompterContent.append(taskCompter)
    meteoInfo = document.querySelector(".meteo_info")
    meteoInfo.innerHTML = '<p>Recherche des données météo en cours</p>'

    if (storedTasks) {
        tasks = storedTasks
        completedTasks = tasks.filter((task) => task.completed).length
        taskCompter.innerHTML = `${completedTasks} / ${totalTasks}`
    }
    
    getMeteo(meteoInfo)
    setInterval(() => {
        getMeteo(meteoInfo)
    }, 1200000)
    updateTasksLists(tasks, tasksList)
    taskProgression(tasks, completedTasks, totalTasks)
})

// Functions
/**
 * addTask: add task
 * @param {string} taskInput 
 * @param {array} tasks 
 */
const addTask = (taskInput, tasks) => {
    const taskName = taskInput.value.trim()

    if (taskName) {
        alert.innerHTML = ""
        if (editingTask) {
            const taskToUpdate = tasks.find(task => task.id === editingTask.id)

            if (taskToUpdate) {
                taskToUpdate.name = taskName
            }
            
            editingTask = null;
        } else {
            tasks.push({id: Date.now(), name: taskName, completed: false})
        }
        taskInput.value = ''
    } else {
        alert.innerHTML = '<p>Veuillez écrire la tâche</p>'
    }
    JSON.parse(localStorage.getItem('tasks'))
    updateTasksLists(tasks, tasksList)
}

/**
 * getMeteo: get meteo data
 * @param {string} meteoInfo 
 */
const getMeteo = async (meteoInfo) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let message = ""

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`)
        }

        const data = await response.json()
        const temperature = data.main.temp
        const city = data.name;
        const country = data.sys.country;
        lastMeteoMessage = `<p>${temperature} °C, ${city}-${country}</p>`
        message = lastMeteoMessage
    } catch (error) {
        if (lastMeteoMessage) {
            message = lastMeteoMessage
        } else {
            message = `<p class="apiInfo">Erreur lors de la récupération des données météo ! <a href="#" onclick="restartApi(meteoInfo)">Actualiser</a></p>`
        }
    }

    meteoInfo.innerHTML = message
}

/**
 * restartApi: restart api data
 * * @param {HTMLBodyElement} meteoInfo
 */
const restartApi = (meteoInfo) => {
    meteoInfo.innerHTML = '<p>Recherche des données météo en cours</p>'
    getMeteo(meteoInfo)
}

/**
 * taskProgression: Display progression
 * @param {array} tasks 
 * @param {number} completedTasks 
 * @param {number} totalTasks 
 */

const taskProgression = (tasks, completedTasks, totalTasks) => {
    completedTasks = tasks.filter((task) => task.completed).length
    taskCompter.innerHTML = `${completedTasks} / ${tasks.length}`
    totalTasks = tasks.length === 0 ? 1 : tasks.length
    let completedLevel = (completedTasks/totalTasks)*100
    const progress = document.getElementById("progress")
    progress.style.width = `${completedLevel}%`
    levelInfo.innerHTML = `Niveau: ${completedLevel.toFixed(2)}%`
}

/**
 * taskStatus: Update task status
 * @param {number} index 
 */
const taskStatus = (id) => {
    const task = tasks.find(task => task.id === id)
    if (task) {
        task.completed = !task.completed
        updateTasksLists(tasks, tasksList)
        taskProgression(tasks, completedTasks, totalTasks)
    }
}

/**
 * editTask: Edit task
 * @param {number} id
 */
const editTask = (id) => {
    alert.innerHTML = ""
    taskInput.value = ''
    const taskToEdit = tasks.find(task => task.id === id)
    if (taskToEdit) {
        taskInput.value = taskToEdit.name
        editingTask = taskToEdit
        taskInput.focus()
    }
}

/**
 * deleteTask: Delete task
 * @param {number} id
 */
const deleteTask = (id) => {
    alert.innerHTML = ""
    const taskId = tasks.findIndex(task => task.id === id)
    if (taskId > -1) {
        tasks.splice(taskId, 1)
        updateTasksLists(tasks, tasksList)
        taskProgression(tasks, completedTasks, totalTasks)
    }
}

/**
 * updateTasksLists: Update tasks list
 * @param {array} tasks 
 * @param {string} tasksList 
 */
const updateTasksLists = (tasks, tasksList) => {
    tasksList.innerHTML = ""

    tasks.map((task) => {
        const completed = task.completed ? "completed" : "";
        let taskItem = document.createElement("li")

        taskItem.innerHTML = `
        <div class="taskItem">
            <div class="taskTitle ${completed}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <p>${task.name}</p>
            </div>
            <div class="taskActions">
                <button class="btnUpdate" onclick="editTask(${task.id})">
                    <i class="fa-duotone fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btnDelete" onclick="deleteTask(${task.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        `
        const checkbox = taskItem.querySelector('.checkbox');
        checkbox.addEventListener("change", () => {
            taskStatus(task.id)
        });

        tasksList.append(taskItem)
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
