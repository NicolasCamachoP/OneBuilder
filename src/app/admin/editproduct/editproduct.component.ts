import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { StockService } from '../../services/stock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit, OnDestroy {

  public product: Product = new Product();
  private sub: any;

  constructor(
    private stockSrv: StockService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.stockSrv.getProduct(params['EAN']).subscribe(result => {
        this.product = result;
      });
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public saveProduct() {
    this.stockSrv.updateProduct(this.product);
    this.router.navigate(["/admin"]);
  }

}
