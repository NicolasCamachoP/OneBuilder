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

    public register(newUser: User, role: String): Promise<User> {
      return  this.http
        .post<User>("http://localhost:8080/user/create/" + role, newUser)
        .toPromise();
    }

    login(loginCredentials: LoginObject): Promise<User> {
      return this.http.post<any>("http://localhost:8080/user/login", loginCredentials)
        .toPromise().then(result  => {
          console.log(result);
          console.log("|||||||");
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
