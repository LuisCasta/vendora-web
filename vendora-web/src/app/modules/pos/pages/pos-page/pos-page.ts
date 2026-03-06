import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';



@Component({
  selector:'app-pos-page',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./pos-page.html',
  styleUrls:['./pos-page.css']
})
export class PosPageComponent{

  @ViewChild('searchInput') searchInput!: ElementRef;
  searchTerm=''

  closeWeightModal(){

  this.weightModal=false

  this.selectedProduct=null

  this.kilos=null

  this.amount=null

  }

  @HostListener('document:keydown.escape', [])
  handleEsc(){

    if(this.weightModal){

    this.closeWeightModal()

    }

  }

  @HostListener('document:keydown.+')
  increaseQty(){

    if(this.selectedTicketIndex===null) return

    this.ticket[this.selectedTicketIndex].qty++

  }

  @HostListener('document:keydown.-')
  decreaseQty(){

    if(this.selectedTicketIndex===null) return

    const item=this.ticket[this.selectedTicketIndex]

    if(item.qty>1){

    item.qty--

    }

  }

  @HostListener('document:keydown.delete')
  deleteItem(){

    this.removeSelectedItem()

  }

  products=[

  { code:'1001', name:'Chocolate Hershey', price:18, type:'unit', stock:25 },
  { code:'1002', name:'Chocolate Kinder', price:22, type:'unit', stock:15 },
  { code:'1003', name:'Gomitas Ácidas', price:15, type:'unit', stock:40 },
  { code:'1004', name:'Gomitas Panditas', price:14, type:'unit', stock:50 },

  { code:'2001', name:'Gomitas a Granel', price:120, type:'weight', stock:5000 },
  { code:'2002', name:'Chilito en Polvo', price:150, type:'weight', stock:3000 },

  { code:'1005', name:'Mazapán', price:10, type:'unit', stock:60 },
  { code:'1006', name:'Chicles Trident', price:9, type:'unit', stock:80 },

  { code:'1007', name:'Coca Cola', price:20, type:'unit', stock:45 }

  ]

  filteredProducts=[...this.products]

  selectedTicketIndex:number | null = null

  ticket:any[]=[]

  weightModal=false

  weightValue=0

  selectedProduct:any=null

  kilos:number | null = null

  amount:number | null = null

  ngAfterViewInit(){
    this.searchInput.nativeElement.focus()
  }

  
  openWeightModal(product:any){

    this.selectedProduct=product

    this.kilos=null

    this.amount=null

    this.weightModal=true

  }

  updateFromKilos(){

    if(!this.kilos) return

    this.amount = Number((this.kilos * this.selectedProduct.price).toFixed(2))

  }

  updateFromAmount(){

    if(!this.amount) return

    this.kilos = Number((this.amount / this.selectedProduct.price).toFixed(3))

  }
  
  confirmWeight(){

    if(!this.kilos || !this.amount) return

    this.ticket.push({

      name:this.selectedProduct.name,

      price:this.selectedProduct.price,

      qty:this.kilos,

      total:this.amount,

      type:'weight'

    })

    this.weightModal=false

  }

  filterProducts(){

    const term=this.searchTerm.toLowerCase()

    this.filteredProducts=this.products.filter(p=>

    p.name.toLowerCase().includes(term) ||

    p.code.toLowerCase().includes(term)

    )

  }

  selectTicketItem(index:number){

    this.selectedTicketIndex=index

  }

  addProduct(product:any){

    if(product.type==='weight'){

    this.openWeightModal(product)

    return

    }

    const existing=this.ticket.find(t=>t.name===product.name)

    if(existing){

    existing.qty++

    }else{

    this.ticket.push({...product,qty:1})

    }

    }


  addFirstProduct(){

    const codeProduct=this.products.find(p=>p.code===this.searchTerm)

    if(codeProduct){

    this.addProduct(codeProduct)

    this.searchTerm=''

    this.filterProducts()

    return

    }

    if(this.filteredProducts.length>0){

    this.addProduct(this.filteredProducts[0])

    this.searchTerm=''

    this.filterProducts()

    }

  }

  removeSelectedItem(){

    if(this.selectedTicketIndex===null) return

    this.ticket.splice(this.selectedTicketIndex,1)

    this.selectedTicketIndex=null

  }

  removeItem(index:number){

    this.ticket.splice(index,1)

    this.selectedTicketIndex=null

  }


  getTotal(){

    return this.ticket.reduce((sum,item)=>sum+(item.price*item.qty),0)

  }

}