import { LOCALE_ID } from '@angular/core';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DataTableModule } from 'angular-4-data-table';
import { ChartModule } from 'angular2-chartjs';
import { QrcodeComponent } from './view/qrcode/qrcode.component';

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
import { LoginComponent } from './login/login/login.component';
import { StockComponent } from './view/stock/stock.component';
import { GsmComponent } from './charts/gsm/gsm.component';
import { BfComponent } from './charts/bf/bf.component';
import { GraphsComponent } from './view/graphs/graphs.component';
import { NgbdDatepickerRangeComponent } from './ngbd-datepicker-range/ngbd-datepicker-range.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminComponent } from './view/admin/admin.component';
import { PublishComponent } from './view/publish/publish.component';
import { SignupComponent } from './login/signup/signup.component';
import { PlanComponent } from './view/plan/plan.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ReceiptsComponent } from './view/receipts/receipts.component';
import { SalesDetailsComponent } from './view/sales-details/sales-details.component';
export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}
declare var require: any;

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
    DaybookComponent,
    LoginComponent,
    StockComponent,
    GsmComponent,
    BfComponent,
    GraphsComponent,
    NgbdDatepickerRangeComponent,
    AdminComponent,
    PublishComponent,
    SignupComponent,
    PlanComponent,
    QrcodeComponent,
    ReceiptsComponent,
    SalesDetailsComponent
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
    Ng2GoogleChartsModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    NgxQRCodeModule
  ],
  providers: [InventoryService, ServerService, AuthGuard, AuthService,
    {provide: LOCALE_ID, useValue: "en-IN"},
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
