import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaces/products-orders.interface';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private products = new BehaviorSubject<Producto[]>([]); // Valor inicial vacío o el que desees
    currentProducts = this.products.asObservable();

    updateProducts(products: Producto[]) {
        console.log(products);
        this.products.next(products); // Actualiza el valor de banks y products al cambiar
    }


}
