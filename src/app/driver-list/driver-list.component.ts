import { Component, OnInit } from '@angular/core';
import {Driver} from '../model/driver';
import {Vehicle} from '../model/vehicle';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  vehicles: Vehicle[] = [
    new Vehicle(1, '13442-a-6', 'Volvo', 157000),
    new Vehicle(2,  '6497-b-8', 'Ford', 225867),
    new Vehicle(3,  '24761-c-13', 'Renault', 1482)
  ];


  drivers: Driver[] =  [
    new Driver(1, 'Arbi', 'Ahmed', '13456/b1',
      this.vehicles[0], 'assets/img/driver1.jpg'),
    new Driver(2, 'Charaf', 'Hamid', '176546/b3',
      this.vehicles[1], 'assets/img/driver2.jpeg'),
    new Driver(3, 'Jilali', 'Jawad', '94821/f6',
      this.vehicles[2], 'assets/img/driver3.png')
  ];

  // DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS)
  // by sanitizing values to be safe to use in the different DOM contexts.
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  getImgContent(img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }
}
