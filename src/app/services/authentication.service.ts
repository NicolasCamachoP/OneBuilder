import { Injectable, DebugElement, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import { User } from '../models/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
    private userBroadcaster: BehaviorSubject<User>;
    public user: Observable<User>;
    //private usersArrayName = 'mock-users-array';
    //private users = JSON.parse(localStorage.getItem(this.usersArrayName)) || [];


    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        //this.userBroadcaster = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.userBroadcaster = new BehaviorSubject<User>(null);
        this.user = this.userBroadcaster.asObservable();
        /*if (this.users.length === 0) {
            this.initializeUsersData();
        }*/
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
    }

    public register(user: User): Observable<User> {
      return this.sendRegisterRequest(user);
    }
    private sendRegisterRequest(newUser: User){
      let registeredUser: User;
      console.log(newUser);
      let subject = new Subject<User>();
      this.http
        .post<User>("http://localhost:8080/user/create", newUser)
        .subscribe( registerResult => {
          if (registerResult.email === newUser.email){
            registeredUser = registerResult;
          }else{
            registeredUser = null;
          }
          subject.next(registeredUser);
        });
      return subject.asObservable();
    }

    login(email, password): Observable<User> {
        return this.sendLoginRequest({'email': email, 'password': password});
    }
    private sendLoginRequest(loginCredentials: any): Observable<User>{
        let loggedUser: User;
        let subject = new Subject<User>();
        this.http
          .post<User>(
            "http://localhost:8080/user/login", loginCredentials)
          .subscribe(loginResult => {
            if (loginResult.email === loginCredentials.email){
              loggedUser = loginResult;
              this.userBroadcaster.next(loggedUser);
            } else{
              loggedUser = null;
            }
            subject.next(loggedUser);
          });
          return subject.asObservable();
    }

    logout() {
        //localStorage.removeItem('user');
        this.userBroadcaster.next(null);
        this.router.navigate(['/']);
    }

}
