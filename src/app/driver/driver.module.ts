import { NgModule } from '@angular/core';

import { DriverListComponent } from '../driver-list/driver-list.component';
import { DriverItemComponent } from '../driver-item/driver-item.component';
import { DriverDetailsComponent } from '../driver-details/driver-details.component';
import { DriverComponent } from '../driver/driver.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    DriverComponent,
    DriverListComponent,
    DriverItemComponent,
    DriverDetailsComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DriverComponent,
    DriverListComponent,
    DriverItemComponent,
    DriverDetailsComponent,
  ]
})
export class DriverModule { }
