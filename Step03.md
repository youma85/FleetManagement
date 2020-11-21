# Step 03 : Databinding
 
### Move the driver card element to Item component

The purpose of this move is to see the Output and Input in action.

***Move the card to item component***

Html:
```
<mat-card class="example-card" appShadow>
  <mat-card-header>
    <div mat-card-avatar [style.backgroundImage]="getImgContent(driver.photo)" style="background-size: cover;" ></div>
    <mat-card-title>{{driver.firstName}} {{driver.lastName}}</mat-card-title>
    <mat-card-subtitle>{{driver.drivingLicense}}</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="{{driver.photo}}" class="card-image" alt="{{driver.firstName}}" >
  <mat-card-content class="card-content">
    Driver of :  {{driver.vehicle?.brand}} / {{driver.vehicle?.registrationNumber}}
  </mat-card-content>
  <mat-card-actions>
     <button mat-raised-button (click)="onClick()">Show</button>
  </mat-card-actions>
</mat-card>
```

In the TypeScript, add Input and Output and on the Show button emit the event to the list component:
```
  @Input() driver: Driver;
  @Output() driverSelected = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  getImgContent(img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }

  onClick(): void{
    this.driverSelected.emit();
  }
```

***Use the item component on the List component***

In the html modify the existing code by:
```
<div class="cardList">
  <app-driver-item
    *ngFor="let drv of drivers"
    [driver]="drv"
    (driverSelected)="onDriverSelected(drv)"></app-driver-item>
</div>
```

And in the typescript file, handle the received driver from the item component
```
  onDriverSelected(driver: Driver): void {
    console.log(driver);
  }
```

###Show selected driver In the Details component

***driver list component***

Add an output on driver list to emit the selected driver to the driver component

```
    @Output() driverSelected = new EventEmitter<Driver>();
    ...
    onDriverSelected(driver: Driver): void {
      this.driverSelected.emit(driver);
    }
```

***Driver Component***

Intercept the selected driver in the driver component, by adding a new attribute to the component

```
currentDriver: Driver;
```

and catch it using the eventbinding:
```
<app-driver-list (driverSelected)="currentDriver = $event"></app-driver-list>
```

***Details Component***

On the Details component add an input() to specify the driver:
```
@Input() driver: Driver;
```

and in the Html file set the value of controls using the driver attribute, for example:

```
<input matInput placeholder="First Name"  value="{{driver.firstName}}">
...
<mat-select [value]="driver.vehicle.id">
...

```

and for the photo control, change it by:

```
  <section>
    <img mat-card-image src="{{driver.photo}}" class="card-image" >
  </section>

  <section>
    <input placeholder="Photo" type="file" (change)="onImageUploaded($event)">
  </section>
```

***Driver Component***

On the driver component change the call use of the driver details component by:

```
  <app-driver-details
    *ngIf="currentDriver; else noDriver"
    [driver]="currentDriver"></app-driver-details>

  <ng-template #noDriver>
    <p>No Driver selected</p>
  </ng-template>
```

In case of the current Driver is selected , we gonna show his details, else a message will be displayed.

###Adding vehicle using local reference and event emitter 

On the dialog html file, will be like this:

```
<div class="example-form">

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Registration Number</mat-label>
    <input matInput placeholder="Registration Number" #registrationNumber>
  </mat-form-field>

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Brand</mat-label>
    <input matInput placeholder="Brand" #brand>
  </mat-form-field>

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Current Km</mat-label>
    <input matInput placeholder="Current Km" #currentKm>
  </mat-form-field>


  <div class="button-row">
    <button mat-flat-button color="primary" (click)="onSave()">Save</button>
  </div>
</div>
``` 

here I added local reference to get value of inputs, and handle the save button click event.

In the typsecript file, via ViewChild we can get value of inputs, and with the vehicleAdded output we emit the created vehicle to the parent component:

```
  @ViewChild('registrationNumber') registrationNumberInput: ElementRef;
  @ViewChild('brand') brandInput: ElementRef;
  @ViewChild('currentKm') currentKmInput: ElementRef;
  @Output() vehicleAdded = new EventEmitter<Vehicle>();

  onSave(): void {
    const registrationNumber = this.registrationNumberInput.nativeElement.value;
    const brand = this.brandInput.nativeElement.value;
    const currentKm = this.currentKmInput.nativeElement.value;

    this.vehicleAdded.emit(new Vehicle(0, registrationNumber, brand, currentKm));
    this.registrationNumberInput.nativeElement.value = '';
    this.brandInput.nativeElement.value = '';
    this.currentKmInput.nativeElement.value = '';
  }
```

Then , we must capture the vehicle added in the list component, using the eventEmitter:

```
<app-vehicle-dialog (vehicleAdded)="onVehicleAdded($event)"></app-vehicle-dialog>
```

and on the method we add the vehicle to the array

```
  onVehicleAdded(vehicle: Vehicle): void {
    this.vehicles.push(vehicle);
    this.dataSource = new MatTableDataSource(this.vehicles);
  }
```
