import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Producto, PedidosProducto, ProductoResponse } from './interfaces/products-orders.interface';
import { ProductosPedidosService } from './services/order.service';
import { DataRefreshService } from './services/communication.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  producto!: Producto
  pedidos: PedidosProducto[] = []
  visible: boolean = false
  products: Producto[] = []
  infoProducto!: any
  modalInfo:boolean = false

  @Output() updateRecord = new EventEmitter<string>();
  idPedidoSeleccionado!: string

  idSelected!: string

  constructor(
    private dataRefreshService: DataRefreshService,
    private productosPedidosService: ProductosPedidosService,
    private commonsService: CommonService
  ) {
  }
  ngOnInit(): void {
    this.getAllProducts();  // Primero obtenemos los productos
    this.dataRefreshService.refresh$.subscribe(() => {
      if (this.products.length > 0) {
        this.getAllOrders(this.products[0].id_business);
      }
    });

    this.dataRefreshService.refresh$.subscribe(() => {
      if (this.idSelected) {  // Usa el id actual del negocio seleccionado
        this.getAllOrders(this.idSelected);
      }
    });
  }

  getAllOrders(idBusinessId: string) {
    console.log(idBusinessId);
    this.productosPedidosService.getAll(idBusinessId).subscribe((response: ProductoResponse) => {
      if (response.data.length > 0) {
        this.pedidos = response.data[0].pedidos_productos;
      } else {
        this.pedidos = []
      }
    });
  }

  onSelectChange(event: any) {
    this.idSelected = event.target.value;
    this.getAllOrders(this.idSelected);
  }

  deleteOrder(id: string) {
    this.productosPedidosService.delete(id).subscribe({
      next: (response: any) => {
        if (response.rta) {
          this.getAllOrders(this.idSelected);
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  wacthOrder(id:string) {
    this.modalInfo = true;
    this.productosPedidosService.getOne(id).subscribe({
      next: (response: any) => {
        if (response.rta) {
          console.log(response);
          this.infoProducto = response.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  getAllProducts() {
    this.productosPedidosService.getProducts().subscribe({
      next: (response: any) => {
        if (response.rta) {
          this.products = response.data;
          this.commonsService.updateProducts(this.products);

          if (this.products.length > 0) {
            this.getAllOrders(this.products[0].id_business);
          }
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  onEdit(record: string) {
    this.idPedidoSeleccionado = record;
    this.visible = true;
    this.updateRecord.emit(record);  // Emite el registro al componente del formulario
  }

  showDialog() {
    this.visible = true;
  }

  closeModal(event: any) {
    this.visible = event;
  }


}
