import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {MatTableDataSource} from '@angular/material/table';
import {VehicleService} from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  displayedColumns: string[] = ['id', 'registrationNumber', 'brand', 'currentKm'];

  dataSource: MatTableDataSource<Vehicle>;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
  }

  onVehicleAdded(vehicle: Vehicle): void {
    this.vehicleService.getVehicles().push(vehicle);
    this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
  }
}
