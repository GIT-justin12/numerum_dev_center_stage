import axios from 'axios';
import type { Task } from '../types/task';
import TASKS from "../models/mock-task";

class TodoListServices {

    static tasks:Task[] = TASKS;

    static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

    static getTasks(): Promise<Task[]> {
        if (this.isDev) {
            return axios.get('http://localhost:3000/tasks')
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                }
            );
        }

        return new Promise(resolve => {
            console.log(this.tasks);
            resolve(this.tasks);
        });
    }

    static addTask(task: Task): Promise<Task> {
        if (this.isDev) {
             return axios.post('http://localhost:3000/tasks', task)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }

        return new Promise(resolve => {
            console.log(task);
            this.tasks.push(task)
            resolve(task);
        });
    }

    static updateTask(id: string, task: Task): Promise<Task> {
        if (this.isDev) {
            return axios.put(`http://localhost:3000/tasks/${id}`, task)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                }
            );
        }

        return new Promise(resolve => {
            const index = this.tasks.findIndex(task => task.id === id);
            this.tasks[index] = task;
            console.log(task);
            resolve(task);
        }); 
    }

    static deleteTask(id: string): Promise<Task[] | void> {
        if (this.isDev) {
            return axios.delete(`http://localhost:3000/tasks/${id}`)
                .then( () => {
                    console.log(`Task ${id} deleted`);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                }
            );
        }

        return new Promise(resolve => {    
            this.tasks = this.tasks.filter(task => task.id !== id);
            resolve(this.tasks);
        }); 
    }
}

export default TodoListServices;