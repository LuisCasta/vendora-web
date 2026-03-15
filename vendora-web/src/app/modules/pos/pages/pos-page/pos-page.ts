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
selectedTicketIndex:number|null=null


/* ======================
TICKETS (MULTI)
====================== */

tickets:{id:number,name:string,items:any[],discount:number}[]=[
  { id:1, name:'Ticket #1', items:[], discount:0 }
]

activeTicketIndex=0
nextTicketId=2

editingTabIndex:number|null=null
editingTabName=''

get ticket(){ return this.tickets[this.activeTicketIndex].items }

get discountApplied(){ return this.tickets[this.activeTicketIndex].discount }
set discountApplied(v:number){ this.tickets[this.activeTicketIndex].discount=v }


/* ======================
PRODUCTOS
====================== */

products:any[]=[

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

discountPercent:number|null=null
discountAmount:number|null=null
discountModal=false


/* ======================
COBRO
====================== */

paymentModal=false
paymentMethod='efectivo'
splitAmount1:number|null=null
splitAmount2:number|null=null
splitMethod1='efectivo'
splitMethod2='tarjeta'
ticketModal=false


/* ======================
GRANEL
====================== */

weightModal=false
selectedProduct:any=null
kilos:number|null=null
amount:number|null=null


/* ======================
NUEVO PRODUCTO
====================== */

addProductModal=false
newProduct:{code:string,name:string,price:number|null,type:string,stock:number|null}={
  code:'',name:'',price:null,type:'unit',stock:null
}


/* ======================
EDITAR PRODUCTO
====================== */

editProductModal=false
editingProduct:{index:number,code:string,name:string,price:number|null,type:string,stock:number|null}={
  index:-1,code:'',name:'',price:null,type:'unit',stock:null
}


/* ======================
INIT
====================== */

ngOnInit(){
  this.isMobile=window.innerWidth<768
  if(!this.isMobile) this.filteredProducts=[...this.products]
}

ngAfterViewInit(){
  this.searchInput.nativeElement.focus()
}


/* ======================
TABS / TICKETS PENDIENTES
====================== */

newTicket(){
  this.tickets.push({ id:this.nextTicketId, name:`Ticket #${this.nextTicketId}`, items:[], discount:0 })
  this.activeTicketIndex=this.tickets.length-1
  this.nextTicketId++
  this.selectedTicketIndex=null
  this.searchInput.nativeElement.focus()
}

switchTicket(index:number){
  this.activeTicketIndex=index
  this.selectedTicketIndex=null
  this.searchInput.nativeElement.focus()
}

closeTicketTab(index:number, event:Event){
  event.stopPropagation()
  if(this.tickets.length===1){
    this.tickets[0]={ id:1, name:'Ticket #1', items:[], discount:0 }
    this.nextTicketId=2
    this.activeTicketIndex=0
    this.selectedTicketIndex=null
    return
  }
  this.tickets.splice(index,1)
  if(this.activeTicketIndex>=this.tickets.length){
    this.activeTicketIndex=this.tickets.length-1
  }
  this.selectedTicketIndex=null
}

startEditTab(index:number, event:Event){
  event.stopPropagation()
  this.editingTabIndex=index
  this.editingTabName=this.tickets[index].name
  setTimeout(()=>{
    const el=document.getElementById('tab-name-input')
    if(el)(el as HTMLInputElement).select()
  },30)
}

confirmEditTab(){
  if(this.editingTabIndex===null) return
  const name=this.editingTabName.trim()
  if(name) this.tickets[this.editingTabIndex].name=name
  this.editingTabIndex=null
}

ticketItemCount(index:number){
  return this.tickets[index].items.reduce((s:number,i:any)=>s+i.qty,0)
}


/* ======================
BUSCAR PRODUCTOS
====================== */

filterProducts(){
  const term=this.searchTerm.toLowerCase()
  if(!term && this.isMobile){ this.filteredProducts=[]; return }
  this.filteredProducts=this.products.filter(p=>
    p.name.toLowerCase().includes(term)||p.code.toLowerCase().includes(term)
  )
}


/* ======================
AGREGAR PRODUCTO
====================== */

addProduct(product:any){
  if(product.type==='weight'){ this.openWeightModal(product); return }
  const existing=this.ticket.find((t:any)=>t.name===product.name)
  if(existing){ existing.qty++ }
  else{ this.ticket.push({...product,qty:1}) }
}

addFirstProduct(){
  const codeProduct=this.products.find(p=>p.code===this.searchTerm)
  if(codeProduct){
    this.addProduct(codeProduct)
    this.searchTerm=''; this.filterProducts(); return
  }
  if(this.filteredProducts.length>0){
    this.addProduct(this.filteredProducts[0])
    this.searchTerm=''; this.filterProducts()
  }
}


/* ======================
TICKET ITEMS
====================== */

selectTicketItem(index:number){ this.selectedTicketIndex=index }

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
TOTALES
====================== */

getSubtotal(){
  return this.ticket.reduce((sum:number,item:any)=>sum+(item.price*item.qty),0)
}

getTotal(){
  return this.getSubtotal()-this.discountApplied
}


/* ======================
LIMPIAR
====================== */

clearTicket(){
  this.tickets[this.activeTicketIndex].items=[]
  this.tickets[this.activeTicketIndex].discount=0
  this.discountPercent=null
  this.discountAmount=null
  this.selectedTicketIndex=null
}


/* ======================
DESCUENTO
====================== */

openDiscountModal(){ this.discountModal=true }

applyDiscount(){
  const subtotal=this.getSubtotal()
  if(this.discountPercent) this.discountApplied=(subtotal*this.discountPercent)/100
  if(this.discountAmount) this.discountApplied=this.discountAmount
  this.discountModal=false
}


/* ======================
COBRAR
====================== */

openPaymentModal(){ this.paymentModal=true }

confirmPayment(){
  this.paymentModal=false
  this.discountPercent=null
  this.discountAmount=null
  if(this.tickets.length>1){
    this.tickets.splice(this.activeTicketIndex,1)
    if(this.activeTicketIndex>=this.tickets.length){
      this.activeTicketIndex=this.tickets.length-1
    }
  } else {
    this.clearTicket()
  }
  this.selectedTicketIndex=null
}


/* ======================
GRANEL
====================== */

openWeightModal(product:any){
  this.selectedProduct=product; this.kilos=null; this.amount=null; this.weightModal=true
}

closeWeightModal(){
  this.weightModal=false; this.selectedProduct=null; this.kilos=null; this.amount=null
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
  if(!this.kilos||!this.amount) return
  this.ticket.push({
    name:this.selectedProduct.name, price:this.selectedProduct.price,
    qty:this.kilos, total:this.amount, type:'weight'
  })
  this.weightModal=false
}

openTicketModal(){ this.ticketModal=true }


/* ======================
NUEVO PRODUCTO
====================== */

openAddProductModal(){
  this.newProduct={ code:'', name:'', price:null, type:'unit', stock:null }
  this.addProductModal=true
}

saveNewProduct(){
  if(!this.newProduct.name||!this.newProduct.code||!this.newProduct.price||!this.newProduct.stock) return
  this.products.push({
    code:this.newProduct.code, name:this.newProduct.name,
    price:this.newProduct.price, type:this.newProduct.type, stock:this.newProduct.stock
  })
  this.filterProducts()
  this.addProductModal=false
}


/* ======================
EDITAR PRODUCTO
====================== */

openEditProductModal(event:Event, product:any){
  event.stopPropagation()
  const index=this.products.findIndex(p=>p.code===product.code)
  this.editingProduct={ index, code:product.code, name:product.name,
    price:product.price, type:product.type, stock:product.stock }
  this.editProductModal=true
}

saveEditProduct(){
  if(this.editingProduct.index<0) return
  const p=this.products[this.editingProduct.index]
  p.code=this.editingProduct.code; p.name=this.editingProduct.name
  p.price=this.editingProduct.price; p.type=this.editingProduct.type; p.stock=this.editingProduct.stock
  this.filterProducts()
  this.editProductModal=false
}


/* ======================
TECLAS
====================== */

@HostListener('document:keydown',['$event'])
handleKeydown(event:KeyboardEvent){

  if(event.key==='F12'){
    event.preventDefault()
    if(!this.anyModalOpen()) this.openPaymentModal()
    return
  }

  if(event.key==='F2'){
    event.preventDefault()
    if(this.paymentModal) this.confirmPayment()
    return
  }

  if(event.key==='F3'){
    event.preventDefault()
    if(!this.anyModalOpen()) this.newTicket()
    return
  }

  if(event.key==='F4'){
    event.preventDefault()
    if(!this.anyModalOpen()&&this.tickets.length>1){
      this.switchTicket((this.activeTicketIndex+1)%this.tickets.length)
    }
    return
  }

  if(event.key==='Escape'){
    if(this.editingTabIndex!==null){ this.editingTabIndex=null; return }
    if(this.weightModal)      { this.weightModal=false; return }
    if(this.discountModal)    { this.discountModal=false; return }
    if(this.paymentModal)     { this.paymentModal=false; return }
    if(this.addProductModal)  { this.addProductModal=false; return }
    if(this.editProductModal) { this.editProductModal=false; return }
    if(this.ticketModal)      { this.ticketModal=false; return }
  }

  const tag=(event.target as HTMLElement).tagName
  const inInput=tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA'
  if(!inInput){
    if(event.key==='+'&&this.selectedTicketIndex!==null) this.ticket[this.selectedTicketIndex].qty++
    if(event.key==='-'&&this.selectedTicketIndex!==null){
      const item=this.ticket[this.selectedTicketIndex]
      if(item.qty>1) item.qty--
    }
    if(event.key==='Delete') this.removeSelectedItem()
  }

}

anyModalOpen(){
  return this.weightModal||this.discountModal||this.paymentModal
      ||this.addProductModal||this.editProductModal||this.ticketModal
}

}