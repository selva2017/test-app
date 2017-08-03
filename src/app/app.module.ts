import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
    EditInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule
  ],
  providers: [InventoryService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
