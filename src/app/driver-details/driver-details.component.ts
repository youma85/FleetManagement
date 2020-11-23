import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {Driver} from '../model/driver';
import {VehicleService} from '../services/vehicle.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DriverService} from '../services/driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  @Input() driver: Driver;

  vehicles: Vehicle[] = [];

  id: number;

  editMode = false;

  constructor(private vehicleService: VehicleService,
              private driverService: DriverService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.vehicles = this.vehicleService.getVehicles();

    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.driver = this.driverService.getDriver(this.id);
      this.editMode =  params.id != null;
      if (!this.editMode){
        this.driver = new Driver();
        this.driver.vehicle = new Vehicle();
      }
    });
  }

  saveDriver(): void {
    this.driverService.saveDriver(this.driver);
    this.driverService.driverSelected.next(this.driver);
    this.router.navigate(['/drivers']);
  }

  onImageUploaded($event: Event): void {
  }
}
