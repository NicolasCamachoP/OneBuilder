import { Injectable, DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userBroadcaster: BehaviorSubject<User>;
    public user: Observable<User>;
    private usersArrayName = 'mock-users-array';
    private users = JSON.parse(localStorage.getItem(this.usersArrayName)) || [];
    private initializeAdmins = false;


    constructor(
        private router: Router,
    ) {
        this.userBroadcaster = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userBroadcaster.asObservable();
    }

    public get userValue(): User {
        return this.userBroadcaster.value;
    }

    public registerAdmin(){
        if (this.initializeAdmins){
            // Mock new admin
            let user: User = new User();
            user.email = "admin@administrator.com";
            user.isAdmin = true;
            user.name = "Administrador";
            user.password = "admin123";
            user.token = "000000";
            user.UID = this.users.length ? Math.max(...this.users.map(x => x.UID)) + 1 : 1;
            this.users.push(user);
            localStorage.setItem(this.usersArrayName, JSON.stringify(this.users));
        }
    }

    register(user: User): boolean {

        if (this.users.find(x => x.email === user.email)) {
            console.log("Username taken");
            return false;
        }
        else {
            // Adds new UID
            user.UID = this.users.length ? Math.max(...this.users.map(x => x.UID)) + 1 : 1;
            this.users.push(user);
            localStorage.setItem(this.usersArrayName, JSON.stringify(this.users));
            return true;
        }
    }

    login(email, password): boolean {
        const user = this.users.find(x => x.email === email && x.password === password);
        if (!user) {
            console.log("Wrong Credentials");
            return false;
        } else {
            localStorage.setItem('user', JSON.stringify(user));
            this.userBroadcaster.next(user);
            return true;
        }
    }

    logout() {
        localStorage.removeItem('user');
        this.userBroadcaster.next(null);
        this.router.navigate(['/']);
    }

}
