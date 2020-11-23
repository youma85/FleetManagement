import {AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VehicleService} from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('registrationNumber') registrationNumberInput: ElementRef;
  @ViewChild('brand') brandInput: ElementRef;
  @ViewChild('currentKm') currentKmInput: ElementRef;

  editMode = false;

  vehicle: Vehicle;

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>,
              private vehicleService: VehicleService,
              @Inject(MAT_DIALOG_DATA) public data: Vehicle) {
    this.vehicle = data;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    if (this.vehicle.id !== undefined){
      this.editMode = true;
      this.registrationNumberInput.nativeElement.value = this.vehicle.registrationNumber;
      this.brandInput.nativeElement.value = this.vehicle.brand;
      this.currentKmInput.nativeElement.value = this.vehicle.currentKm;
    }else {
      this.editMode = false;
    }
  }


  onSave(): void {
    const registrationNumber = this.registrationNumberInput.nativeElement.value;
    const brand = this.brandInput.nativeElement.value;
    const currentKm = this.currentKmInput.nativeElement.value;

    if (this.editMode){
      this.vehicleService.updateVehicle(new Vehicle(this.vehicle.id, registrationNumber, brand, currentKm));
    }else {
      this.vehicleService.addVehicle(new Vehicle(0, registrationNumber, brand, currentKm));
    }

    this.vehicleService.vehicleChanged.next();

    this.registrationNumberInput.nativeElement.value = '';
    this.brandInput.nativeElement.value = '';
    this.currentKmInput.nativeElement.value = '';

    this.dialogRef.close();
  }
}
