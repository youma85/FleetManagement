import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverComponent} from './driver/driver.component';
import {DriverListComponent} from './driver-list/driver-list.component';
import {DriverDetailsComponent} from './driver-details/driver-details.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {AuthComponent} from './auth/auth.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/drivers', pathMatch: 'full'},
  {path: 'drivers', component: DriverComponent, children: [
      {path: '', component: DriverListComponent},
      {path: 'new', component: DriverDetailsComponent},
      {path: ':id', component: DriverDetailsComponent}
    ]},
  {path: 'vehicles', component: VehicleComponent},
  {path: 'login', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
