import { Component, OnInit } from '@angular/core';

import { ServerService } from '../../shared/server.service';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-modify-inventory',
  templateUrl: './modify-inventory.component.html',
  styleUrls: ['./modify-inventory.component.css']
})
export class ModifyInventoryComponent implements OnInit {

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
