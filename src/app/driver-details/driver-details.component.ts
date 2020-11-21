import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {Driver} from '../model/driver';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  @Input() driver: Driver;

  vehicles: Vehicle[] = [
    new Vehicle(1, '13442-a-6', 'Volvo', 157000),
    new Vehicle(2,  '6497-b-8', 'Ford', 225867),
    new Vehicle(3,  '24761-c-13', 'Renault', 1482)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onImageUploaded($event: Event): void {
  }
}
