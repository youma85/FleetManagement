# Step 09 : Forms

###Adding forms to vehicles dialog

Of course the FormsModule must be presents on the sharedModule

For this page we gonna use TD approch:

In the html page, we change div by form with: (ngSubmit)="onSave(form)" #form="ngForm"

and for each control we must add a name and ngModel

also we must remove the click handler from the save button and change the type to submit

```
<form (ngSubmit)="onSave(form)" #form="ngForm">

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Registration Number</mat-label>
    <input matInput placeholder="Registration Number" name="registrationNumber" ngModel>
  </mat-form-field>

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Brand</mat-label>
    <input matInput placeholder="Brand" name="brand" ngModel>
  </mat-form-field>

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Current Km</mat-label>
    <input matInput placeholder="Current Km" name="currentKm" ngModel>
  </mat-form-field>


  <div class="button-row">
    <button mat-flat-button color="primary" type="submit">Save</button>
  </div>
</form>
```

On the typescript side we have to remove all the ViewChild and add one of the form.

```
@ViewChild('form') vehicleForm: NgForm;
```

also we have to change the existing code by:

```
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
```

###Adding validation to vehicle dialog

add required for inputs like:

```
<input matInput placeholder="Current Km" name="currentKm" ngModel required type="number">
```

and disable save button if a field is not filled


```
<button mat-flat-button color="primary" type="submit" [disabled]="!form.valid">Save</button
```

###Adding clear button
add a button to reset values

```
    <button mat-flat-button color="primary" [disabled]="!form.valid" >{{ editMode? 'Update': 'Add' }}</button>
    <button mat-flat-button color="accent" type="button"  (click)="form.reset();">Clear</button>
```

###Adding message error

get errors of the element of form, for example:

```
    <mat-error *ngIf="form.controls['registrationNumber']?.errors?.required">
      Registration Number is <strong>required</strong>
    </mat-error>
```

###improve Style

```
.button-row button,
.button-row a {
  margin-right: 8px;
}
```
