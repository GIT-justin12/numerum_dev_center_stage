document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(storedTasks)
    if (storedTasks) {
        tasks = storedTasks
        updateTasksLists(tasks, tasksList)
    }
    
    getMeteo(meteoInfo)
    updateTasksLists()
})

let tasks = []

// Constant
const lat = 6.16667
const lon = 1.21667
const apiKey = "be334233bc1bc9dcdf76d435879ba2d5"
const addBtn = document.querySelector(".btn")
const taskInput = document.querySelector('.taskInput')
const taskCompterContent = document.querySelector(".task_compter")
const meteoInfo = document.querySelector(".meteo_info")
const alert = document.querySelector(".alert")


// Variables
let completedTasks = 0
let totalTasks = tasks.length
let tasksList = document.querySelector(".tasksList")
let taskCompter = document.createElement("span")



taskCompter.innerHTML = `${completedTasks} / ${totalTasks}`
taskCompterContent.append(taskCompter)


addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addTask(taskInput, tasks)
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
        tasks.push({name: taskName, completed: false})
        updateTasksLists(tasks, tasksList)
        alert.innerHTML = ""
    } else {
        alert.innerHTML = '<p>Veuillez écrire la tâche</p>'
    }
    taskInput.value = ''
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
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const data = await response.json();
        const temperature = data.main.temp;
        const city = data.name;
        const country = data.sys.country;
        console.log(data)
        message = `<p>${temperature} °C, ${city}-${country}</p>`
    } catch (error) {
        message = `<p>Erreur lors de la récupération des données météo: ${error}</p>`
    }

    meteoInfo.innerHTML = message
};

/**
 * taskProgression: Display progression
 * @param {array} tasks 
 * @param {number} completedTasks 
 * @param {number} totalTasks 
 */

const taskProgression = (tasks, completedTasks, totalTasks) => {
    completedTasks = tasks.filter((task) => task.completed).length
    totalTasks = tasks.length
    let completedLevel = (completedTasks/totalTasks)*100
    const progress = document.getElementById("progress")
    progress.style.width = `${completedLevel}%`
    taskCompter.innerHTML = `${completedTasks} / ${totalTasks}`
}

/**
 * taskStatus: Update task status
 * @param {number} index 
 */
const taskStatus = (index) => {
    tasks[index].completed = !tasks[index].completed
}

/**
 * editTask: Edit task
 * @param {number} index 
 */
const editTask = (index) => {
    taskInput.value = tasks[index].name
    deleteTask(index)
}

/**
 * deleteTask: Delete task
 * @param {number} index 
 */
const deleteTask = (index) => {
    alert.innerHTML = ""
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTasksLists(tasks, tasksList)
    taskProgression(tasks, completedTasks, totalTasks)
}

/**
 * updateTasksLists: Update tasks list
 * @param {array} tasks 
 * @param {string} tasksList 
 */
const updateTasksLists = (tasks, tasksList) => {
    tasksList.innerHTML = ""

    tasks.map((task, index) => {
        const completed = task.completed ? "completed" : "";
        let taskItem = document.createElement("li")

        taskItem.innerHTML = `
        <div class="taskItem">
            <div class="taskTitle ${completed}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <p>${task.name}</p>
            </div>
            <div class="taskActions">
                <button class="btnUpdate" onclick="editTask(${index})">
                    <i class="fa-duotone fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btnDelete" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        `
        const checkbox = taskItem.querySelector('.checkbox');
        checkbox.addEventListener("change", () => {
            taskStatus(index)
            updateTasksLists(tasks, tasksList)
            taskProgression(tasks, completedTasks, totalTasks)
        });

        tasksList.append(taskItem)
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })
}
