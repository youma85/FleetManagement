import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {MatTableDataSource} from '@angular/material/table';
import {VehicleService} from '../services/vehicle.service';
import {MatDialog} from '@angular/material/dialog';
import {VehicleDialogComponent} from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  displayedColumns: string[] = ['id', 'registrationNumber', 'brand', 'currentKm'];

  dataSource: MatTableDataSource<Vehicle>;

  constructor(private vehicleService: VehicleService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());

    this.vehicleService.vehicleChanged.subscribe(() => {
      this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
    });
  }

  onVehicleAdded(vehicle: Vehicle): void {
    this.vehicleService.getVehicles().push(vehicle);
    this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
  }

  openNewDialog(): void {
    this.dialog.open(VehicleDialogComponent, {
      width: '250px',
      data: new Vehicle()
    });
  }

  showDataInDialog(id: any): void {
    this.dialog.open(VehicleDialogComponent, {
      width: '250px',
      data: this.vehicleService.getVehicleById(id)
    });
  }
}
