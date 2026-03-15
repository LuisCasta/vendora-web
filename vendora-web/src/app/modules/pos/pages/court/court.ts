import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

/* -------------------------------------------------------
  INTERFACES
------------------------------------------------------- */

export interface VentaItem {
  id: number
  hora: string
  productos: string
  metodo: 'efectivo' | 'tarjeta' | 'transferencia'
  total: number
  descuento: number
}

export interface GastoItem {
  id: number
  hora: string
  descripcion: string
  monto: number
}

export interface ProductoTop {
  name: string
  qty: number
  total: number
}

/* -------------------------------------------------------
  COMPONENT
------------------------------------------------------- */

@Component({
  selector: 'app-corte-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './court.html',
  styleUrls: ['./court.css']
})
export class CortePageComponent implements OnInit {

  fecha = new Date()
  nombreCajero = 'Luis'
  nombreTienda = 'Dulcería Candy Store'

  /* ---- Datos del día (en producción vendrían de un servicio) ---- */

  ventas: VentaItem[] = [
    { id:1021, hora:'08:05', productos:'Coca Cola x2, Doritos x1',      metodo:'efectivo',      total:58,  descuento:0  },
    { id:1022, hora:'08:47', productos:'Gomitas Ácidas x3',              metodo:'efectivo',      total:45,  descuento:5  },
    { id:1023, hora:'09:12', productos:'Chocolate Kinder x2, Pepsi x1', metodo:'tarjeta',       total:63,  descuento:0  },
    { id:1024, hora:'09:38', productos:'Snickers x4',                   metodo:'transferencia', total:80,  descuento:0  },
    { id:1025, hora:'10:00', productos:'Paleta de Fresa x5',            metodo:'efectivo',      total:60,  descuento:10 },
    { id:1026, hora:'10:22', productos:'Agua Ciel x6',                  metodo:'tarjeta',       total:78,  descuento:0  },
    { id:1027, hora:'11:15', productos:'Doritos x2, Sabritas x2',       metodo:'efectivo',      total:72,  descuento:0  },
    { id:1028, hora:'11:45', productos:'Gomitas Ácidas x4, Lucas x2',   metodo:'efectivo',      total:94,  descuento:0  },
    { id:1029, hora:'12:30', productos:'Paleta Payaso x3',              metodo:'tarjeta',       total:72,  descuento:12 },
    { id:1030, hora:'13:00', productos:'Cacahuates Japoneses x5',       metodo:'transferencia', total:80,  descuento:0  },
    { id:1031, hora:'13:45', productos:'M&M x3, Skittles x3',          metodo:'efectivo',      total:123, descuento:0  },
    { id:1032, hora:'14:20', productos:'Galletas Oreo x4',              metodo:'tarjeta',       total:76,  descuento:0  },
  ]

  gastos: GastoItem[] = [
    { id:1, hora:'09:00', descripcion:'Compra de bolsas',        monto:50  },
    { id:2, hora:'11:00', descripcion:'Pago de servicio limpieza', monto:150 },
    { id:3, hora:'14:00', descripcion:'Reposición de monedas',   monto:100 },
  ]

  /* ---- Computed ---- */

  get totalVentas()        { return this.ventas.reduce((s, v) => s + v.total, 0) }
  get totalEfectivo()      { return this.ventas.filter(v => v.metodo === 'efectivo').reduce((s, v) => s + v.total, 0) }
  get totalTarjeta()       { return this.ventas.filter(v => v.metodo === 'tarjeta').reduce((s, v) => s + v.total, 0) }
  get totalTransferencia() { return this.ventas.filter(v => v.metodo === 'transferencia').reduce((s, v) => s + v.total, 0) }
  get totalDescuentos()    { return this.ventas.reduce((s, v) => s + v.descuento, 0) }
  get totalGastos()        { return this.gastos.reduce((s, g) => s + g.monto, 0) }
  get netoCaja()           { return this.totalEfectivo - this.totalGastos }
  get numTransacciones()   { return this.ventas.length }

  get ventasConDescuento() { return this.ventas.filter(v => v.descuento > 0) }

  get topProductos(): ProductoTop[] {
    const map: Record<string, ProductoTop> = {}
    this.ventas.forEach(v => {
      v.productos.split(',').forEach(p => {
        const match = p.trim().match(/^(.+?)\s*x(\d+)$/)
        if (!match) return
        const name = match[1].trim()
        const qty  = parseInt(match[2])
        if (!map[name]) map[name] = { name, qty: 0, total: 0 }
        map[name].qty   += qty
      })
    })
    // precio aproximado por nombre (en producción vendría del catálogo)
    return Object.values(map)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 6)
  }

  get pctEfectivo()      { return this.totalVentas ? Math.round(this.totalEfectivo / this.totalVentas * 100) : 0 }
  get pctTarjeta()       { return this.totalVentas ? Math.round(this.totalTarjeta / this.totalVentas * 100) : 0 }
  get pctTransferencia() { return this.totalVentas ? Math.round(this.totalTransferencia / this.totalVentas * 100) : 0 }

  corteCerrado = false

  ngOnInit() {}

  cerrarCorte() {
    this.corteCerrado = true
  }

  imprimir() {
    window.print()
  }
}