import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesComponent } from './sales/sales.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { ModifyInventoryComponent } from './inventory/modify-inventory/modify-inventory.component';
import { ViewInventoryComponent } from './inventory/view-inventory/view-inventory.component';
import { EditInventoryComponent } from './inventory/edit-inventory/edit-inventory.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'inventory', component: InventoryComponent , children: [
    { path: 'add', component: AddInventoryComponent },
     { path: 'modify', component: ModifyInventoryComponent },
      { path: 'view', component: ViewInventoryComponent },
      { path: 'edit', component: EditInventoryComponent }
  ] },
  { path: 'sales', component: SalesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
