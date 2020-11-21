import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Vehicle} from '../model/vehicle';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent implements OnInit {
  @ViewChild('registrationNumber') registrationNumberInput: ElementRef;
  @ViewChild('brand') brandInput: ElementRef;
  @ViewChild('currentKm') currentKmInput: ElementRef;
  @Output() vehicleAdded = new EventEmitter<Vehicle>();

  constructor() { }

  ngOnInit(): void {
  }

  onSave(): void {
    const registrationNumber = this.registrationNumberInput.nativeElement.value;
    const brand = this.brandInput.nativeElement.value;
    const currentKm = this.currentKmInput.nativeElement.value;

    this.vehicleAdded.emit(new Vehicle(0, registrationNumber, brand, currentKm));
    this.registrationNumberInput.nativeElement.value = '';
    this.brandInput.nativeElement.value = '';
    this.currentKmInput.nativeElement.value = '';
  }
}
