import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core'

@Component({
  selector:'app-pos-page',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./pos-page.html',
  styleUrls:['./pos-page.css']
})
export class PosPageComponent implements AfterViewInit{

@ViewChild('searchInput') searchInput!: ElementRef

searchTerm=''

isMobile=false

ticket:any[]=[]

selectedTicketIndex:number | null = null


/* ======================
PRODUCTOS
====================== */

products=[

{ code:'1001', name:'Chocolate Hershey', price:18, type:'unit', stock:25 },
{ code:'1002', name:'Chocolate Kinder', price:22, type:'unit', stock:15 },
{ code:'1003', name:'Gomitas Ácidas', price:15, type:'unit', stock:40 },
{ code:'1004', name:'Gomitas Panditas', price:14, type:'unit', stock:50 },

{ code:'1005', name:'Mazapán', price:10, type:'unit', stock:60 },
{ code:'1006', name:'Chicles Trident', price:9, type:'unit', stock:80 },
{ code:'1007', name:'Coca Cola', price:20, type:'unit', stock:45 },

{ code:'1008', name:'Pepsi', price:19, type:'unit', stock:40 },
{ code:'1009', name:'Fanta Naranja', price:19, type:'unit', stock:35 },
{ code:'1010', name:'Sprite', price:19, type:'unit', stock:30 },

{ code:'1011', name:'Agua Ciel', price:13, type:'unit', stock:60 },
{ code:'1012', name:'Agua Bonafont', price:13, type:'unit', stock:55 },

{ code:'1013', name:'Snickers', price:20, type:'unit', stock:25 },
{ code:'1014', name:'Milky Way', price:19, type:'unit', stock:30 },
{ code:'1015', name:'M&M Chocolate', price:21, type:'unit', stock:35 },

{ code:'1016', name:'Skittles', price:20, type:'unit', stock:40 },
{ code:'1017', name:'Lucas Muecas', price:17, type:'unit', stock:50 },
{ code:'1018', name:'Pelón Pelo Rico', price:18, type:'unit', stock:45 },

{ code:'1019', name:'Pulparindo', price:16, type:'unit', stock:60 },
{ code:'1020', name:'Tamaroca', price:15, type:'unit', stock:55 },

{ code:'1021', name:'Paleta Payaso', price:24, type:'unit', stock:20 },
{ code:'1022', name:'Paleta de Fresa', price:12, type:'unit', stock:35 },
{ code:'1023', name:'Paleta Mango', price:12, type:'unit', stock:35 },

{ code:'1024', name:'Churrumais', price:14, type:'unit', stock:40 },
{ code:'1025', name:'Doritos', price:18, type:'unit', stock:30 },
{ code:'1026', name:'Sabritas', price:18, type:'unit', stock:28 },

{ code:'1027', name:'Cacahuates Japoneses', price:16, type:'unit', stock:35 },
{ code:'1028', name:'Cacahuates Enchilados', price:17, type:'unit', stock:30 },

{ code:'1029', name:'Galletas Oreo', price:19, type:'unit', stock:22 },
{ code:'1030', name:'Galletas Emperador', price:18, type:'unit', stock:25 },


/* PRODUCTOS A GRANEL */

{ code:'2001', name:'Gomitas a Granel', price:120, type:'weight', stock:5000 },
{ code:'2002', name:'Chilito en Polvo', price:150, type:'weight', stock:3000 },
{ code:'2003', name:'Miguelito en Polvo', price:140, type:'weight', stock:2800 },
{ code:'2004', name:'Tamarindo Enchilado', price:130, type:'weight', stock:3500 },
{ code:'2005', name:'Cacahuate Garapiñado', price:160, type:'weight', stock:4000 },
{ code:'2006', name:'Chocolate a Granel', price:180, type:'weight', stock:3200 }

]

filteredProducts:any[]=[]


/* ======================
DESCUENTO
====================== */

discountPercent:number | null=null
discountAmount:number | null=null
discountApplied=0

discountModal=false


/* ======================
COBRO
====================== */

paymentModal=false
paymentMethod='efectivo'

splitPayment=false

splitAmount1:number | null=null
splitAmount2:number | null=null

splitMethod1='efectivo'
splitMethod2='tarjeta'

ticketModal=false


/* ======================
GRANEL
====================== */

weightModal=false
selectedProduct:any=null
kilos:number | null=null
amount:number | null=null


/* ======================
INIT
====================== */

ngOnInit(){

this.isMobile = window.innerWidth < 768

if(!this.isMobile){
this.filteredProducts=[...this.products]
}

}

ngAfterViewInit(){
this.searchInput.nativeElement.focus()
}


/* ======================
BUSCAR PRODUCTOS
====================== */

filterProducts(){

const term=this.searchTerm.toLowerCase()

if(!term && this.isMobile){
this.filteredProducts=[]
return
}

this.filteredProducts=this.products.filter(p=>

p.name.toLowerCase().includes(term) ||
p.code.toLowerCase().includes(term)

)

}


/* ======================
AGREGAR PRODUCTO
====================== */

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


/* ======================
ENTER PRODUCTO
====================== */

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


/* ======================
TICKET
====================== */

selectTicketItem(index:number){
this.selectedTicketIndex=index
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


/* ======================
TOTAL
====================== */

getTotal(){

return this.getSubtotal() - this.discountApplied

}


/* ======================
LIMPIAR
====================== */

clearTicket(){

this.ticket=[]
this.discountApplied=0
this.discountPercent=null
this.discountAmount=null

}


/* ======================
DESCUENTO
====================== */

openDiscountModal(){

this.discountModal=true

}

applyDiscount(){

const subtotal=this.ticket.reduce((sum,item)=>sum+(item.price*item.qty),0)

if(this.discountPercent){

this.discountApplied=(subtotal*this.discountPercent)/100

}

if(this.discountAmount){

this.discountApplied=this.discountAmount

}

this.discountModal=false

}

getSubtotal(){

return this.ticket.reduce((sum,item)=>sum+(item.price*item.qty),0)

}


/* ======================
COBRAR
====================== */

openPaymentModal(){

this.paymentModal=true

}

confirmPayment(){

this.paymentModal=false
this.clearTicket()

}


/* ======================
GRANEL
====================== */

openWeightModal(product:any){

this.selectedProduct=product
this.kilos=null
this.amount=null
this.weightModal=true

}

closeWeightModal(){

this.weightModal=false

this.selectedProduct=null

this.kilos=null

this.amount=null

}

updateFromKilos(){

if(!this.kilos) return

this.amount=Number((this.kilos*this.selectedProduct.price).toFixed(2))

}

updateFromAmount(){

if(!this.amount) return

this.kilos=Number((this.amount/this.selectedProduct.price).toFixed(3))

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

openTicketModal(){

this.ticketModal=true

}

/* ======================
TECLAS
====================== */

@HostListener('document:keydown.escape')
handleEsc(){

if(this.weightModal) this.weightModal=false
if(this.discountModal) this.discountModal=false
if(this.paymentModal) this.paymentModal=false

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

if(item.qty>1) item.qty--

}

@HostListener('document:keydown.delete')
deleteItem(){

this.removeSelectedItem()

}

}