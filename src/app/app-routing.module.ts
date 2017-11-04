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
import { SimpleChartExampleComponent } from './charts/simple-chart-example/simple-chart-example.component';
import { TestComponent } from './test/test.component';
import { GoogleChartComponent } from './charts/google-chart/google-chart.component';
import { Ang2ChartjsComponent } from './charts/ang2-chartjs/ang2-chartjs.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './login/login/login.component';
import { DaybookComponent } from './view/daybook/daybook.component';
import { AuthGuard } from './login/auth-guard.service';
import { BfComponent } from './charts/bf/bf.component';
import { GsmComponent } from './charts/gsm/gsm.component';
import { StockComponent } from './view/stock/stock.component';
import { GraphsComponent } from './view/graphs/graphs.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'googlechart', component: GoogleChartComponent },
  { path: 'gsmchart', component: GsmComponent },
  { path: 'bfchart', component: BfComponent, canActivate: [AuthGuard] },
  { path: 'ngchart', component: Ang2ChartjsComponent, canActivate: [AuthGuard] },
  {
    path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard], children: [
      { path: 'add', component: AddInventoryComponent },
      { path: 'modify', component: ModifyInventoryComponent },
      { path: 'view', component: ViewInventoryComponent },
      { path: 'edit', component: EditInventoryComponent }
    ]
  },
  // { path: 'graphs', component: SimpleChartExampleComponent },
  { path: 'daybook', component: DaybookComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'graphs', component: GraphsComponent, canActivate: [AuthGuard]},
  { path: 'sales', component: SalesComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  // imports: [
  //   RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  //   // ],
  //   exports: [RouterModule]
  // })
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
