import { Component, OnInit } from '@angular/core';
import {Driver} from '../model/driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  currentDriver: Driver;

  constructor() { }

  ngOnInit(): void {
  }

}
