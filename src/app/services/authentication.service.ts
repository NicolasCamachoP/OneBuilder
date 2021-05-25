import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {LoginObject} from '../models/loginobject';
import {APIENDPOINT} from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  public user: Observable<User>;
  private userBroadcaster: BehaviorSubject<User>;
  private userToken?: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.initializeUserData();
    if (sessionStorage.getItem('token')) {
      this.recoverSession();
    }
  }

  private saveSession(): void {
    sessionStorage.setItem('token', this.userToken);
  }

  private deleteSession(): void {
    sessionStorage.removeItem('token');
  }


  public get userValue(): User {
    return this.userBroadcaster.value;
  }

  public ngOnDestroy() {
    sessionStorage.removeItem('user');
  }

  public register(newUser: User, role: String): Promise<User> {
    return this.http
      .post<User>(APIENDPOINT + 'user/create', newUser)
      .toPromise().then(user => {
        var loginCredentials: LoginObject = new LoginObject(newUser);
        loginCredentials.email = newUser.email;
        loginCredentials.password = newUser.password;
        return this.login(loginCredentials);
      }).catch(error => {
        return Promise.reject();
      });
  }

  login(loginCredentials: LoginObject): Promise<User> {
    let user: User;
    return this.http
      .post<any>(APIENDPOINT + 'login', loginCredentials, {observe: 'response'})
      .toPromise().then(resp => {
        this.userToken = resp.headers.get('Authorization');
        this.saveSession();
        return this.http.get<User>(APIENDPOINT + 'user/' + loginCredentials.email)
          .toPromise().then(result => {
            this.userBroadcaster.next(result);
            user = result;
            return Promise.resolve(result);
          }).catch(error => {
            return Promise.reject();
          });
      });

  }

  logout() {
    this.http.post<any>(APIENDPOINT + 'logout', {}).toPromise().then(() => {
      this.userBroadcaster.next(null);
      this.deleteSession();
      this.router.navigate(['/']);
    }).catch(error => {
      console.log(error);
    });

  }

  private initializeUserData() {
    this.userBroadcaster = new BehaviorSubject<User>(null);
    this.user = this.userBroadcaster.asObservable();
  }

  private recoverSession() {
    this.userToken = localStorage.getItem('token');
    var decodedToken = jwt_decode(this.userToken);
    if ((new Date()).valueOf() < decodedToken['exp'] * 1000) {
      this.http.get<User>(APIENDPOINT + 'user/' + decodedToken['sub'])
        .toPromise().then(result => {
        this.userBroadcaster.next(result);
      }).catch(error => {
        this.deleteSession();
      });
    } else {

    }
  }
}
