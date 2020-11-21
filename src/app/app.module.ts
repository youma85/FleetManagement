import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VehicleModule} from './vehicle/vehicle.module';
import {DriverModule} from './driver/driver.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    VehicleModule,
    DriverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
