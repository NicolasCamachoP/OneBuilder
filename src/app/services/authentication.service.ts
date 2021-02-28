import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userBroadcaster: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userBroadcaster = new BehaviorSubject<User>( JSON.parse( localStorage.getItem('user')));
        this.user = this.userBroadcaster.asObservable();
    }

    public get userValue(): User {
        return this.userBroadcaster.value;
    }

    register( user: User ){
        return this.http.post('${environment.apiURL}/users/register', user);
    }

    login( user, password ) {
        return this.http.post<User>('${environment.apiURL}/users/authenticate',
                                    { user, password })
                                    .pipe( map( user => {
                                        localStorage.setItem( 'user', JSON.stringify( user ) );
                                        this.userBroadcaster.next( user );
                                        return user;
                                    }));
    }

    logout() {
        localStorage.removeItem( 'user' );
        this.userBroadcaster.next( null );
        this.router.navigate(['/account/login']);
    }


}
