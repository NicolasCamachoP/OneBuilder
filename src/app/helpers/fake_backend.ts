import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const usersArray = 'mock-users-array';
let users = JSON.parse(localStorage.getItem(usersArray)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
            }
        }

        function register() {
            // Receive all user data
            const user = body;

            if( users.find( x => x.email === user.email )) {
                console.log("Username taken");
                return error('Username taken');
            }
            else {
                // Adds new UID
                user.UID = users.length ? Math.max( ...users.map( x => x.UID )) + 1 : 1;
                users.push( user );
                localStorage.setItem( usersArray, JSON.stringify(users));
                return ok();
            }
        }

        function authenticate() {
            const { email, password } = body;
            const user = users.find( x => x.email === email && x.password === password);
            if(!user) return error('Userbame or password incorrect');
            return ok({
                ...userResponse(user),
                token: 'dummy-auth-token'
            });
        }

        function userResponse(user){
            const { UID, name, email, isAdmin } = user;
            return { UID, name, email, isAdmin };
        }

        function error(message){
            //Test if we can remove pipe materialize stuff
            return throwError({ error: { message } })
            .pipe(materialize(), delay(200), dematerialize());
        }

        function ok(body?){
            return of(new HttpResponse({status: 200, body}));

        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
