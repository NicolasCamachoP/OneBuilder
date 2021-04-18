import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private stockArrayName = 'mock-stock-array';
    private stock: Product[] = JSON.parse(localStorage.getItem(this.stockArrayName)) || [];

    constructor(
      private http: HttpClient
    ) {
        /*if (this.stock.length === 0){
            this.initializeMockProducts();
        }*/

    }

    private initializeMockProducts(){
        this.createProduct("RTX 3090",
        "La GeForce RTX™ 3090 es increíblemente potente en todas las formas, por lo que te brinda un nivel de rendimiento completamente nuevo.",
        5, 2500000, "1365489523149");
        this.createProduct("RTX 3060",
        "La GeForce RTX™ 3060 Ti y la RTX 3060 te permiten disfrutar de los juegos más recientes con la potencia de Ampere, la segunda generación de la arquitectura RTX de NVIDIA.",
        5, 1500000, "1365481523149");
        this.createProduct("Ryzen 5 5600X",
        "Juega con lo mejor. Seis núcleos increíbles para quienes simplemente desean jugar.",
        5, 1800000, "1364481553113");
        this.createProduct("Ryzen 9 5900X",
        "El procesador que ofrece la mejor experiencia de juego del mundo. 12 núcleos para potenciar la experiencia de juego, la transmisión en vivo y mucho más.",
        5, 2300000, "2364781563111");
        this.createProduct("G.SKILL Trident Z Royale 2x16",
        "Memoria RAM. Diseñada para el rendimiento, la memoria G.SKILL de escritorio se diseña con componentes elegidos y probados  rigurosamente a mano.",
        5, 900000, "2361751563222");
        this.createProduct("MPG B550 Gaming Carbon WiFi",
        "La serie MPG saca lo mejor de los jugadores al permitirles la expresión máxima en color con iluminación RGB avanzada.",
        5, 900000, "2361851573222");

    }

    public createProduct(name: string, desc: string, st: number, pr: number, ean: string): Observable<Product> {
      let newProduct: Product = new Product();
      newProduct.stock = st;
      newProduct.name = name;
      newProduct.description = desc;
      newProduct.price = pr;
      newProduct.ean = ean;
      return this.sendProductCreateRequest(newProduct);
    }
    private sendProductCreateRequest(newProduct: Product): Observable<Product>{
      let createdProduct: Product;
      let subject = new  Subject<Product>();
      this.http.post<Product>("http://localhost:8080/product/create", newProduct).subscribe(
        result => {
          if (result.ean === newProduct.ean){
            createdProduct = result;
          }else{
            createdProduct = null;
          }
          subject.next(createdProduct);
        });
      return subject.asObservable();
    }

    public getProduct(ean: string) {
        return this.sendGetProductRequest(ean);
    }
    private sendGetProductRequest(productEan: string){
      let product : Product;
      let subject = new Subject<Product>();
      this.http.get<Product>("http://localhost:8080/product/" + productEan).subscribe( result => {
        if (result.ean === productEan){
          product = result;
        }else{
          product = null;
        }
        subject.next(product);
      });
      return subject.asObservable();
    }

    public getProducts() {
        return this.sendGetProductsRequest();
    }

    private sendGetProductsRequest(): Observable<Product[]>{
      let products:Product[];
      let subject = new Subject<Product[]>();
      this.http.get<Product[]>("http://localhost:8080/product/all").subscribe(
        result => {
          products = result;
          subject.next(products);
        }
      );
      return subject.asObservable();
    }


    public getProductsInStock() {
        return this.stock.filter( x => x.stock > 0 );
    }

    public deleteProduct(id: number) {

        return this.http.delete<Product>("http://localhost:8080/product/" + id);
    }

    public updateProduct(p: Product) {
        this.http.put("http://localhost:8080/product/" + p.uid, p).subscribe(() => {});

    }

    public reduceProductStock(EAN: string, amountBought: number){
        this.stock.find(x => x.ean === EAN).stock -= amountBought;
        localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
    }
}
