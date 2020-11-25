import {Injectable} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleChanged = new Subject<void>();

  url = 'http://localhost:3000/vehicles';

  vehicles: Vehicle[] = [];
  constructor(private  http: HttpClient) { }

  getVehicles(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  addVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.post(this.url, vehicle);
  }

  getVehicleById(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.patch(`${this.url}/${vehicle.id}`, vehicle);
  }
}
