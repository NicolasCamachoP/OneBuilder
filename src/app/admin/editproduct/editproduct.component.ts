import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {StockService} from '../../services/stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit, OnDestroy {

  public product: Product = new Product();
  private prevProduct: Product = new Product();
  private sub: any;

  constructor(
    private stockSrv: StockService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.stockSrv.getProduct(params['EAN']).then(result => {
        this.product = {...result};
        this.prevProduct = {...result};
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private haveChanges(): boolean {
    return this.prevProduct !== this.product;
  }

  public saveProduct() {
    if (this.haveChanges()) {
      this.stockSrv.updateProduct(this.product).then(
        () => this.router.navigate(['/admin'])
      ).catch(() => {
        Swal.fire({
          title: 'Error!',
          text: 'Error al actualizar el producto.',
          icon: 'error',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
        this.router.navigate(['/admin']);
      });
    } else {
      console.log('Error, same.', 'Object Prev: ', this.prevProduct, 'Object New: ', this.product);
    }
  }

}
