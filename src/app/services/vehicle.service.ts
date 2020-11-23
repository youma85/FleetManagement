import {EventEmitter, Injectable} from '@angular/core';
import {Vehicle} from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleChanged = new EventEmitter<void>();

  vehicles: Vehicle[] = [
    new Vehicle(0, '13442-a-6', 'Volvo', 157000),
    new Vehicle(1,  '6497-b-8', 'Ford', 225867),
    new Vehicle(2,  '24761-c-13', 'Renault', 1482)
  ];
  constructor() { }

  getVehicles(): Vehicle[]{
    return this.vehicles;
  }

  addVehicle(vehicle: Vehicle): Vehicle[]{
    vehicle.id = this.vehicles.length;
    this.vehicles.push(vehicle);
    return this.vehicles;
  }

  getVehicleById(id: any): Vehicle {
    return this.vehicles[id];
  }

  updateVehicle(vehicle: Vehicle): void {
    this.vehicles[vehicle.id] = vehicle;
  }
}
