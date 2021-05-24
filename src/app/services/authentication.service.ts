import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginObject} from '../models/loginobject';
import {APIENDPOINT} from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  public user: Observable<User>;
  private userBroadcaster: BehaviorSubject<User>;
  private userToken?: string;
  private headers: HttpHeaders;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.initializeUserData();
    if (localStorage.getItem('token')) {
      this.recoverSession();
    }
  }
  private saveSession(): void{
      localStorage.setItem('token', this.userToken);
  }
  private deleteSession(): void{
      localStorage.removeItem('token');
  }


  public get userValue(): User {
    return this.userBroadcaster.value;
  }

  public ngOnDestroy() {
    localStorage.removeItem('user');
  }

  public register(newUser: User, role: String): Promise<User> {
    return this.http
      .post<User>(APIENDPOINT + 'user/create', newUser)
      .toPromise().then(user =>{
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
        this.headers = new HttpHeaders({'Authorization': this.userToken});
        return this.http.get<User>(APIENDPOINT + 'user/' + loginCredentials.email, {headers: this.headers})
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
    this.http.post<any>(APIENDPOINT + 'logout', {headers: this.headers}).toPromise().then(()=>{
      this.userBroadcaster.next(null);
      this.deleteSession();
      this.router.navigate(['/']);
    }).catch(error=>{
      console.log(error);
    })

  }

  private initializeUserData() {
    this.userBroadcaster = new BehaviorSubject<User>(null);
    this.user = this.userBroadcaster.asObservable();
  }

  private recoverSession() {
    this.userToken = localStorage.getItem('token');
    var decodedToken = jwt_decode(this.userToken);
    if ((new Date()).valueOf() < decodedToken['exp'] * 1000) {
      this.headers = new HttpHeaders({'Authorization': this.userToken});
      this.http.get<User>(APIENDPOINT + 'user/' + decodedToken['sub'], {headers: this.headers})
        .toPromise().then(result => {
        this.userBroadcaster.next(result);
      }).catch(error => {
        this.deleteSession();
      });
    } else {

    }
  }
}
