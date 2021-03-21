import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router} from '@angular/router';
import { SalesService } from '../services/sales.service';
import { User } from '../models/user';
import Swal from "sweetalert2";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public currentClient: User;

  constructor(
    private authSrv: AuthenticationService,
    private router: Router,
    private salesSrv: SalesService, ) {
      this.currentClient = this.authSrv.userValue;
    }

  ngOnInit(): void {
    
  }

  public lastDetail(){
    let saleID = this.salesSrv.getLastSaleIDFromClient(this.currentClient.UID);
    if (saleID === null){
        Swal.fire({
            title: 'Sin Compras!',
            text: 'Aun no has realizado ninguna compra',
            icon: 'error',
            background: '#edf2f4',
            confirmButtonText: 'Aceptar'
        })
    }else{
      this.router.navigate(['client/purchasedetail', saleID]);
    }
  }

  public goToBuy(){
    this.router.navigateByUrl('client/buy');
  }

  public goToPurchases(){
    this.router.navigateByUrl('client/purchases')
  }
}
