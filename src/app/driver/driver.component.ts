import { Component, OnInit } from '@angular/core';
import {Driver} from '../model/driver';
import {DriverService} from '../services/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  currentDriver: Driver;

  constructor(private studentService: DriverService) { }

  ngOnInit(): void {
    this.studentService.driverSelected.subscribe(
      (driver: Driver) => {
        this.currentDriver = driver;
      }
    );
  }

}
