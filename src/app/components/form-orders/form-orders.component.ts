import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../interfaces/products-orders.interface';
import { ProductosPedidosService } from '../../services/order.service';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../services/users.service';
import { User } from '../../interfaces/users.interface';
import { PaymentMethods } from '../../interfaces/payment-methods.interface';
import { PaymentMethodsService } from '../../services/payment-methods.service';
import { Stades } from '../../interfaces/stade.interface';
import { StadesService } from '../../services/stades.service';
import Swal from 'sweetalert2';
import { DataRefreshService } from '../../services/communication.service';
import { CommonService } from '../../services/common.service';



@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.css'
})
export class FormOrdersComponent implements OnInit {

  @Output() visible = new EventEmitter<boolean>();
  products: Producto[] = []
  users: User[] = []
  payments: PaymentMethods[] = []
  stades: Stades[] = []
  public items!: MenuItem[];

  @Input() selectedRecord!: string;  // Recibe el registro seleccionado



  public myForm: FormGroup = this.fb.group({
    producto: ["", [Validators.required]],
    DatosUsuario: ["", [Validators.required]],
    comentario: ['', [Validators.maxLength(255)]],
    idMedioPago: ['', [Validators.required]],
    idEstado: ['', [Validators.required]],
    cantidad: [1, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private productosPedidosService: ProductosPedidosService,
    private userService: UserService,
    private paymentMethodsService: PaymentMethodsService,
    private stadesService: StadesService,
    private dataRefreshService: DataRefreshService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getAllUsers()
    this.getAllPaymentsMethod()
    this.getAllStades()

    this.commonService.currentProducts.subscribe((products: Producto[]) => {
      this.products = products;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedRecord'] && this.selectedRecord) {
      this.productosPedidosService.getOne(this.selectedRecord).subscribe({
        next: (response: any) => {
          if (response.rta) {
            console.log("Response data:", response);

            this.myForm.patchValue({
              producto: response.data.pedidos_productos[0].productos.id,
              DatosUsuario: response.data.id_usuario,
              comentario: response.data.comentario,
              idMedioPago: response.data.id_medio_pago,
              idEstado: response.data.id_estado,
              cantidad: response.data.pedidos_productos[0].cantidad
            });
          }
        },
        error: (er) => {
          Swal.fire({
            title: "Error",
            text: er.error?.message || "An unexpected error occurred",
            icon: "error"
          });
        }
      });
    }
  }


  closeModal() {
    this.visible.emit(false);
  }

  onSelectProduct(id: string) {
    console.log(id);
  }

  onSaveOrder() {
    if (this.myForm.valid) {
      if (this.selectedRecord) {
        this.productosPedidosService.update(this.selectedRecord, this.myForm.value).subscribe({
          next: (response: any) => {
            if (response.rta) {
              Swal.fire({
                title: "Good job!",
                text: `${response.data}`,
                icon: "success"
              });
              this.dataRefreshService.triggerRefresh();
            }
          },
          error: (er) => {
            Swal.fire({
              title: "Error",
              text: er.error?.message || "An unexpected error occurred",
              icon: "error"
            });
          }
        })
        this.dataRefreshService.triggerRefresh();

      } else {
        this.productosPedidosService.create(this.myForm.value).subscribe({
          next: (response: any) => {
            if (response.rta) {
              Swal.fire({
                title: "Good job!",
                text: `${response.data}`,
                icon: "success"
              });
              this.dataRefreshService.triggerRefresh();
            }
          },
          error: (er) => {
            Swal.fire({
              title: "Error",
              text: er.error?.message || "An unexpected error occurred",
              icon: "error"
            });
          }
        })
        // Lógica para crear un nuevo registro
      }
    }
    this.myForm.reset();
    this.visible.emit(false);
  }

  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (response: any) => {
        if (response.rta) {
          this.users = response.data
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  getAllPaymentsMethod() {
    this.paymentMethodsService.getAll().subscribe({
      next: (response: any) => {
        if (response.rta) {
          this.payments = response.data
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  getAllStades() {
    this.stadesService.getAll().subscribe({
      next: (response: any) => {
        if (response.rta) {
          this.stades = response.data
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

}
