import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    faUser = faUser;
    faEnvelope = faEnvelope;
    faLock = faLock;
    public newUser: User = new User();
    public passwordConf: String = "";
    constructor(
        private authServ: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    public registerUser(){
        this.newUser.isAdmin = false;
        if (this.authServ.register(this.newUser)){
            Swal.fire({
                title: 'Perfecto!',
                text: 'Registrado con exito. Bienvenido a OneBuilder!',
                icon: 'success',
                background: '#edf2f4',
                confirmButtonText: 'Cerrar'
            })
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Parece que ya est`as registrado en OneBuilder.',
                icon: 'error',
                background: '#edf2f4',
                confirmButtonText: 'Cerrar'
            })
        }

    }

}
