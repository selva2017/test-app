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
    id: {
      title: 'ID'
    },
    name: {
      title: 'Name'
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

data=[];
data1 = [
  {
    id: 1,
    name: "Leanne Graham",
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
