import {Injectable} from '@angular/core';
import {Driver} from '../model/driver';
import {VehicleService} from './vehicle.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  driverSelected = new Subject<Driver>();

  drivers = [];

  constructor(private vehicleService: VehicleService) {
    const vehicles = this.vehicleService.getVehicles();

    this.drivers =  [
      new Driver(0, 'Arbi', 'Ahmed', '13456/b1',
        vehicles[0], 'images/driver0.png'),
      new Driver(1, 'Charaf', 'Hamid', '176546/b3',
        vehicles[1], 'images/driver1.jpg'),
      new Driver(2, 'Jilali', 'Jawad', '94821/f6',
        vehicles[2], 'images/driver2.jpeg')
    ];

  }

  getDrivers(): Driver[]{
    return this.drivers;
  }

  getDriver(id: number): Driver {
    return this.drivers[id];
  }

  saveDriver(driver: Driver): void {
    if (driver.id === undefined){
      driver.id = this.drivers.length;
      this.drivers.push(driver);
    } else {
      this.drivers[driver.id] = driver;
    }
  }
}
