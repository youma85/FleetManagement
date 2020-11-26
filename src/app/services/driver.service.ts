import {Injectable} from '@angular/core';
import {Driver} from '../model/driver';
import {VehicleService} from './vehicle.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  driverSelected = new Subject<Driver>();

  drivers = [];

  url = 'http://localhost:3000';

  driverEndPoint = `${this.url}/drivers`;

  constructor(private vehicleService: VehicleService,
              private  http: HttpClient) {
  }

  getDrivers(): Observable<any> {
    return this.http.get<any[]>(this.driverEndPoint);
  }

  getDriver(id: number): Observable<any>{
    return this.http.get<any>(`${this.driverEndPoint}/${id}`);
  }

  saveDriver(driver: Driver): Observable<any>{
    if (driver.id === undefined){
      return this.http.post(this.driverEndPoint, driver);
    } else {
      return  this.http.patch(`${this.driverEndPoint}/${driver.id}`, driver);
    }
  }
}
