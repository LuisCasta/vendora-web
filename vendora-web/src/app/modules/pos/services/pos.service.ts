import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PosService {

  cart:any[] = []

  addProduct(product:any){

    this.cart.push(product)

  }

}