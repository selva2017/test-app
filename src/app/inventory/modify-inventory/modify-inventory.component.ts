import { Component, OnInit } from '@angular/core';

import { ServerService } from '../../shared/server.service';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-modify-inventory',
  templateUrl: './modify-inventory.component.html',
  styleUrls: ['./modify-inventory.component.css']
})
export class ModifyInventoryComponent implements OnInit {
  settings = {
    columns: {
      productId: {
        title: 'ID'
      },
      productCode: {
        title: 'Code'
      },
      productName: {
        title: 'Name'
      },
      productQuantity: {
        title: 'Quantity'
      },
      productPrice: {
        title: 'Price'
      },
      supplierId: {
        title: 'SCode'
      },
      supplierName: {
        title: 'Supplier'
      },
      supplierPhone: {
        title: 'Phone'
      }
      // ,
      // username: {
      //   title: 'User Name'
      // },
      // email: {
      //   title: 'Email'
      // }
    }
  };

  data = [];
  data1 = [
    {
      productId: "1",
      productCode: "p3",
      productName: "p3_name",
      productQuantity: "10",
      productPrice: "10.00",
      supplierId: "2",
      supplierName: "selva",
      supplierPhone: "61458565"
      // username: "Bret",
      // email: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      // username: "Antonette",
      // email: "Shanna@melissa.tv"
    },

    {
      id: 11,
      name: "Nicholas DuBuque",
      // username: "Nicholas.Stanton",
      // email: "Rey.Padberg@rosamond.biz"
    }
  ];
  editMode = true;
  constructor(private serverService: ServerService) { }
  products: Product;
  ngOnInit() {
    this.serverService.getWSData()
      .subscribe(
      // (servers: Product) => console.log(servers.name, servers.id),
      (servers: Product) => this.products = servers,
      (error) => console.log(error)
      );
  }
  onClear() { }
  onSubmit() { }
}
