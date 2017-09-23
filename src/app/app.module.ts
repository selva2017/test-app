import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DataTableModule } from 'angular-4-data-table';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesComponent } from './sales/sales.component';
import { HomeComponent } from './core/home/home.component';
import { InventoryService } from './shared/inventory.service';
import { ServerService } from './shared/server.service';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { ModifyInventoryComponent } from './inventory/modify-inventory/modify-inventory.component';
import { ViewInventoryComponent } from './inventory/view-inventory/view-inventory.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AboutComponent } from './about/about.component';
import { EditInventoryComponent } from './inventory/edit-inventory/edit-inventory.component';
import { SimpleChartExampleComponent } from './charts/simple-chart-example/simple-chart-example.component';
import { TestComponent } from './test/test.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleChartComponent } from './charts/google-chart/google-chart.component';
import { Ang2ChartjsComponent } from './charts/ang2-chartjs/ang2-chartjs.component';
import { DaybookComponent } from './view/daybook/daybook.component';

export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}
declare var require : any;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    InventoryComponent,
    SalesComponent,
    HomeComponent,
    AddInventoryComponent,
    ModifyInventoryComponent,
    ViewInventoryComponent,
    AboutComponent,
    EditInventoryComponent,
    SimpleChartExampleComponent,
    TestComponent,
    GoogleChartComponent,
    Ang2ChartjsComponent,
    DaybookComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,//.forRoot(require('highcharts')),
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
    DataTableModule,
    Ng2GoogleChartsModule
  ],
  providers: [InventoryService, ServerService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
