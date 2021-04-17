import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginObject} from '../models/loginobject';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public userCredentials: User = new User();
    constructor(
        private authServ: AuthenticationService,
        private router: Router,
        private http: HttpClient

    ) { }

    ngOnInit(): void {
    }

    public submitLogin(){
        //const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
        this.http
        .get("http://localhost:8080/user"/*, {headers: reqHeader}*/)
        .subscribe(getResult => {
            console.log(getResult);
        });
        this.http
        .get("http://localhost:8080/sale/all"/*, {headers: reqHeader}*/)
        .subscribe(getResult => {
            console.log(getResult);
        });
        this.http
        .get("http://localhost:8080/product/all"/*, {headers: reqHeader}*/)
        .subscribe(getResult => {
            console.log(getResult);
        });

        const loginRequest = {
            'email': "nonito@nonito.com",
            'password': "test123"
        }
        const body = new LoginObject(loginRequest);
        this.sendLoginMock(loginRequest);


        if (this.authServ.login(this.userCredentials.email, this.userCredentials.password)){
            if (this.authServ.userValue.isAdmin){
                this.router.navigateByUrl("/admin");
            }else{
                this.router.navigateByUrl("/client");
            }
        }
        else{
            Swal.fire({
                title: 'Error',
                text: 'Las credenciales no son correctas.',
                icon: 'error',
                background: '#edf2f4',
                confirmButtonText: 'Cerrar'
            });
        }
    }
    private sendLoginMock(data: any){
        this.http
        .post<User>(
            `http://localhost:8080/user/login`, data)
                .subscribe(getResult  => {
                console.log(getResult.UID);
            });
    }


}
