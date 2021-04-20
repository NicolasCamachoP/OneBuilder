import { Injectable, DebugElement, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import { User } from '../models/user';
import {HttpClient} from '@angular/common/http';
import {LoginObject} from '../models/loginobject';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
    private userBroadcaster: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userBroadcaster = new BehaviorSubject<User>(null);
        this.user = this.userBroadcaster.asObservable();
    }

    public ngOnDestroy() {
        localStorage.removeItem('user');
    }

    public get userValue(): User {
        return this.userBroadcaster.value;
    }

    private registerAdmin() {
        let user: User = new User();
        user.email = "admin@onebuilder.com";
        user.password = "admin";
        user.isAdmin = true;
        user.name = "Administrador";
        this.register(user);
    }

    private createMockClients() {
        let user: User = new User();
        user.email = "mark@hotmail.com";
        user.password = "mark";
        user.isAdmin = false;
        user.name = "Mark The Expert";
        this.register(user);
        let user2: User = new User();
        user2.email = "mateo@mateo.com";
        user2.password = "mateo";
        user2.isAdmin = false;
        user2.name = "Mark The Expert";
        this.register(user2);


    }

    public register(newUser: User): Promise<User> {
      return  this.http
        .post<User>("http://localhost:8080/user/create", newUser)
        .toPromise();
    }

    login(loginCredentials: LoginObject): Promise<User> {
      return this.http.post<User>("http://localhost:8080/user/login", loginCredentials)
        .toPromise().then(result  => {
          this.userBroadcaster.next(result);
          return Promise.resolve(result);
        }).catch(error => {
          return Promise.reject();
        });
    }

    logout() {
        this.userBroadcaster.next(null);
        this.router.navigate(['/']);
    }

}
