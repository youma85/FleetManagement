import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  displayedColumns: string[] = ['id', 'registrationNumber', 'brand', 'currentKm'];

  vehicles: Vehicle[] = [
    new Vehicle(1, '13442-a-6', 'Volvo', 157000),
    new Vehicle(2,  '6497-b-8', 'Ford', 225867),
    new Vehicle(3,  '24761-c-13', 'Renault', 1482)
  ];

  dataSource: MatTableDataSource<Vehicle>;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.vehicles);
  }

  onVehicleAdded(vehicle: Vehicle): void {
    this.vehicles.push(vehicle);
    this.dataSource = new MatTableDataSource(this.vehicles);
  }
}
