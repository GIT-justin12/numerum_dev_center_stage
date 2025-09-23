import axios from "axios";
import type { User } from "../types/User";
import USERS from "../models/mock-user";

class usersService {
    static users:User[] = USERS;

    static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
    
    static getUsers(): Promise<User[]> {
        if (this.isDev) {
            return axios.get('http://localhost:3000/users')
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                }
            );
        }

        return new Promise(resolve => {
             resolve(this.users);
        });
    }
}

export default usersService

