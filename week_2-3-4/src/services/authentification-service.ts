import type { User } from "../types/User";

class AuthentificationService {

    static isAuthenticated: boolean = false;
    
    static login(username: string, password: string, users: User[]): Promise<boolean> {
        users.map(user => {
            if (user.username === username && user.password === password) {
                this.isAuthenticated = true;
            }
        });
    
        return new Promise(resolve => {
            setTimeout(() => {
               resolve(this.isAuthenticated);
            }, 1000);
        });
    }
}

export default AuthentificationService;

