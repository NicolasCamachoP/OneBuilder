import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {StockService} from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public product: Product = new Product();

  constructor(
    private stockSrv: StockService,
    private router: Router
  ) {
    this.initializeProduct();
  }

  ngOnInit(): void {
  }

  public saveProduct() {
    if (this.validateProduct()) {
      this.stockSrv.createProduct(this.product.name, this.product.description,
        this.product.stock, this.product.price, this.product.ean).then(result => {
        Swal.fire({
          title: 'Perfecto!',
          text: 'Producto agregado con exito!',
          icon: 'success',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
        this.router.navigateByUrl('/admin');
      }).catch(() => {
        Swal.fire({
          title: 'Error!',
          text: 'EAN ya existente!',
          icon: 'error',
          background: '#edf2f4',
          confirmButtonText: 'Cerrar'
        });
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Faltan datos o no son válidos!',
        icon: 'error',
        background: '#edf2f4',
        confirmButtonText: 'Cerrar'
      });
    }
  }

  private initializeProduct() {
    this.product.ean = null;
    this.product.description = null;
    this.product.name = null;
    this.product.price = null;
    this.product.stock = null;
  }

  private validateProduct(): boolean {
    if (this.product.ean == null ||
      this.product.description == null ||
      this.product.name == null ||
      this.product.price == null ||
      this.product.stock == null) {
      return false;
    }
    return true;
  }

}
