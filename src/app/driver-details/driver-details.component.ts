import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {Driver} from '../model/driver';
import {VehicleService} from '../services/vehicle.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  @Input() driver: Driver;

  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicles = this.vehicleService.getVehicles();
  }

  onImageUploaded($event: Event): void {
  }
}
