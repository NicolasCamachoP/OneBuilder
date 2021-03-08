import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private stockArrayName = 'mock-stock-array';
    private stock: Product[] = JSON.parse(localStorage.getItem(this.stockArrayName)) || [];
    constructor() {
        if (this.stock.length === 0){
            this.initializeMockProducts();
        }
        
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

    public createProduct(name: string, desc: string, st: number, pr: number, ean: string): boolean {
        if (this.stock.find(x => x.EAN === ean)) {
            return false;
        }
        else {
            // Adds new UID
            let p: Product = new Product();
            p.EAN = ean;
            p.description = desc;
            p.name = name;
            p.price = pr;
            p.stock = st;
            p.UID = this.stock.length ? Math.max(...this.stock.map(x => x.UID)) + 1 : 1;
            this.stock.push(p);
            localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
            return true;
        }
    }

    public getProduct(ean: string) {
        return this.stock.find(x => x.EAN === ean);
    }

    public getProducts() {
        return this.stock;
    }

    public getProductsInStock() {
        return this.stock.filter( x => x.stock > 0 );
    }

    public deleteProduct(ean: string) {
        this.stock = this.stock.filter(x => x.EAN !== ean);
        localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
    }

    public updateProduct(p: Product) {
        let flag = true;
        let i = 0;

        while (i < this.stock.length && flag) {
            if (this.stock[i].EAN === p.EAN) {
                this.stock[i] = p;
                flag = false;
                localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
            }
            i++;
        }
    }

    public reduceProductStock(EAN: string, amountBought: number){
        this.stock.find(x => x.EAN === EAN).stock -= amountBought;
        localStorage.setItem(this.stockArrayName, JSON.stringify(this.stock));
    }
}
