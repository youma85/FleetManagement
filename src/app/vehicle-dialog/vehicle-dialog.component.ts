import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VehicleService} from '../services/vehicle.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('form') vehicleForm: NgForm;

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
      setTimeout(() => {
        this.vehicleForm.setValue({
          registrationNumber: this.vehicle.registrationNumber,
          brand: this.vehicle.brand,
          currentKm: this.vehicle.currentKm,
        });
      });
    }else {
      this.editMode = false;
    }
  }


  onSave(form: NgForm): void {
    this.vehicle.registrationNumber = form.value.registrationNumber;
    this.vehicle.brand = form.value.brand;
    this.vehicle.currentKm = form.value.currentKm;

    if (this.editMode){
      this.vehicleService.updateVehicle( this.vehicle);
    }else {
      this.vehicleService.addVehicle( this.vehicle);
    }

    this.vehicleService.vehicleChanged.next();
    this.dialogRef.close();
  }
}
