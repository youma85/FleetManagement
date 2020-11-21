import { NgModule } from '@angular/core';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    VehicleComponent,
    VehicleDialogComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    VehicleComponent,
    VehicleDialogComponent,
  ]
})
export class VehicleModule { }
