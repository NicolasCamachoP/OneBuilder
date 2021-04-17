import { Injectable, DebugElement, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
    private userBroadcaster: BehaviorSubject<User>;
    public user: Observable<User>;
    private usersArrayName = 'mock-users-array';
    private users = JSON.parse(localStorage.getItem(this.usersArrayName)) || [];


    constructor(
        private router: Router,
    ) {
        this.userBroadcaster = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userBroadcaster.asObservable();
        if (this.users.length === 0) {
            this.initializeUsersData();
        }
    }

    public ngOnDestroy() {
        localStorage.removeItem('user');
    }

    public get userValue(): User {
        return this.userBroadcaster.value;
    }

    public initializeUsersData(){
        this.registerAdmin();
        this.createMockClients();
    }

    private registerAdmin() {
        let user: User = new User();
        user.email = "admin@onebuilder.com";
        user.password = "admin";
        user.token = "";
        user.isAdmin = true;
        user.name = "Administrador";
        this.register(user);
    }

    private createMockClients() {
        let user: User = new User();
        user.email = "mark@hotmail.com";
        user.password = "mark";
        user.token = "";
        user.isAdmin = false;
        user.name = "Mark The Expert";
        this.register(user);
        let user2: User = new User();
        user2.email = "mateo@mateo.com";
        user2.password = "mateo";
        user2.token = "";
        user2.isAdmin = false;
        user2.name = "Mark The Expert";
        this.register(user2);


    }

    public register(user: User): boolean {
        if (this.users.find(x => x.email === user.email)) {
            console.log("Username taken");
            return false;
        }
        else {
            user.UID = this.users.length ? Math.max(...this.users.map(x => x.UID)) + 2 : 1;
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
