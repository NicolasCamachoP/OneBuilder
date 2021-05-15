import { Injectable, DebugElement, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from '../models/user';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {LoginObject} from '../models/loginobject';
import { APIENDPOINT } from '../constants/endpoints.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
    private userBroadcaster: BehaviorSubject<User>;
    private userToken?: string;
    private headers: HttpHeaders;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        if(localStorage.getItem('token')){
            this.recoverSession()
        }else{
            this.userBroadcaster = new BehaviorSubject<User>(null);
            this.user = this.userBroadcaster.asObservable();
        }
    }

    public ngOnDestroy() {
        localStorage.removeItem('user');
    }

    public get userValue(): User {
        return this.userBroadcaster.value;
    }

    public register(newUser: User, role: String): Promise<User> {
        return  this.http
        .post<User>(APIENDPOINT + "user/create/" + role, newUser)
        .toPromise();
    }

    recoverSession() {
        this.userToken = localStorage.getItem('token');
        this.http.get<User>(APIENDPOINT + "user/" + localStorage.getItem('email'), {headers: this.headers})
        .toPromise().then(result  => {
            this.userBroadcaster.next(result);
        }).catch(error => {
            localStorage.clear();
            this.userBroadcaster = new BehaviorSubject<User>(null);
            this.user = this.userBroadcaster.asObservable();
        });

    }

    login(loginCredentials: LoginObject): Promise<User> {
        let user: User;
        return this.http
        .post<any>(APIENDPOINT + "login", loginCredentials, {observe: 'response'})
        .toPromise().then(resp => {
            console.log(resp.headers.get("Authorization"));
            localStorage.setItem('token', resp.headers.get('Authorization'));
            localStorage.setItem('email', loginCredentials.email);
            this.userToken = resp.headers.get('Authorization');
            this.headers = new HttpHeaders({'Authorization': this.userToken});
            return this.http.get<User>(APIENDPOINT + "user/" + loginCredentials.email, {headers: this.headers})
            .toPromise().then(result  => {
                console.log(result);
                this.userBroadcaster.next(result);
                user = result;
                return Promise.resolve(result);
            }).catch(error => {
                return Promise.reject();
            });
        });

    }

    getUserFromLogin(loginCredentials: LoginObject)  {
    }


    logout() {
        this.userBroadcaster.next(null);
        localStorage.clear();
        this.router.navigate(['/']);
    }

}
