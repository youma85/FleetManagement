# Step 01
 

### Create the Application 

```sh
ng new FleetManagement
```


### Add NgMaterial

```sh
ng add @angular/material
```


### Add a navBar

I will use the toolbar of angular material to create the navbar

```sh
ng g c navbar
```

***navbar.component.html***

```
<mat-toolbar color="primary" class="mat-elevation-z8">
  <span><mat-icon>directions_car</mat-icon> Fleet Management</span>

  <div class="spacer"></div>

  <a href="#" mat-button>Drivers</a>
  <a href="#" mat-button>Vehicles</a>
</mat-toolbar>
```

***navbar.component.css***

```
.spacer{
  flex: 1 1 auto;
}
```

add material modules to appModule:

    MatToolbarModule,
    MatIconModule,
    MatButtonModule

### Create needed components

I will create the needed components for the app for example driver and vehicle

```sh
ng g c driver
```

```sh
ng g c vehicle
```

```sh
ng g c driver-list
```

```sh
ng g c driver-item
```

```sh
ng g c driver-details
```

```sh
ng g c vehicle-dialog
```

driver.component.html
```
<mat-card>
  <app-driver-list></app-driver-list>
</mat-card>

<mat-card>
  <app-driver-details></app-driver-details>
</mat-card>
```

add MatCardModule to appModule

### Create needed classes

Create Vehicle class with this command:

```sh
ng g class model/vehicle
```

```
export class Vehicle {
  constructor(public id?: number,
              public registrationNumber?: string,
              public brand?: string,
              public currentKm?: number){}
}
```

Create Driver class with this command:

```sh
ng g class model/driver
```

add the code bellow:

```
import {Vehicle} from './vehicle';

export class Driver {
  constructor(public id?: number,
              public firstName?: string,
              public lastName?: string,
              public drivingLicense?: string,
              public vehicle?: Vehicle,
              public photo?: string){}
}
```

## Change tsconfig
```
{
  "compilerOptions": {
    "strictNullChecks": false,
  }
}
```

##  implement the driver list page

### driver list

Add the following code on typescript file:

```
  vehicles: Vehicle[] = [
    new Vehicle(1, '13442-a-6', 'Volvo', 157000),
    ...
  ];


  drivers: Driver[] =  [
    new Driver(1, 'Arbi', 'Ahmed', '13456/b1',
      this.vehicles[0], 'assets/img/driver1.jpg'),
      ...
  ];

  constructor(private sanitizer: DomSanitizer) { }

  getImgContent(img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }
```

and the following on the html one:

```
<h1>List of Drivers</h1>

<div class="cardList">
  <mat-card class="example-card" *ngFor="let driver of drivers">
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
      <button mat-raised-button>Show</button>
    </mat-card-actions>
  </mat-card>

</div>
```

and style for the end:

```
.cardList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cardList > * {
  box-sizing: border-box;
}

.cardList > *:not(:last-child) {
  margin-right: 32px;
}

.btn{
  margin: 5px;
}
/*item*/
.card-image{
 height: 300px;
 width: 300px;
 object-fit: contain;
}

.card-content{
  font-size: large;
  font-weight: bolder;
  margin: auto;
  text-align: center;
}

.mat-card-actions .flex-spacer{
  width: 100%;
}

.example-card {
  width: 300px;
  flex: 0 1 calc(23% - 32px);
  margin: 32px;
}
```

### driver details

Add the list of vehicles to the typescript file:

```
  vehicles: Vehicle[] = [
    new Vehicle(1, '13442-a-6', 'Volvo', 157000),
    new Vehicle(2,  '6497-b-8', 'Ford', 225867),
    new Vehicle(3,  '24761-c-13', 'Renault', 1482)
  ];
```

this list will be used in the select element.

On the html page add this code:

```
<form class="example-form">
  <mat-form-field class="example-full-width">
    <mat-label>First Name</mat-label>
    <input matInput placeholder="First Name">
  </mat-form-field>

  <mat-form-field class="example-full-width">
    <mat-label>Last Name</mat-label>
    <input matInput placeholder="Last Name">
  </mat-form-field>

  <mat-form-field class="example-full-width">
    <mat-label>Driving License</mat-label>
    <input matInput placeholder="Driving License">
  </mat-form-field>

  <mat-form-field class="example-full-width">
    <mat-label>Vehicle</mat-label>
    <mat-select>
      <mat-option *ngFor="let vehicle of vehicles" [value]="vehicle.id">
        {{vehicle.brand}}: {{vehicle.registrationNumber}}
      </mat-option>
    </mat-select>
  </mat-form-field>

  <input placeholder="Photo" type="file">

  <div class="button-row">
    <button mat-flat-button color="primary">Save</button>
  </div>

</form>
```

and the style:

```
.example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.example-full-width {
  width: 100%;
}

td {
  padding-right: 8px;
}
```

Of course the following material modules must be added on the import array of app.module

```
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
```

##  implement the Vehicle pages

First of all we have to add the module MatTableModule in the app.module file.

### Vehicles List

vehicle.component.html
```
<div class="button-row">
  <button mat-flat-button color="primary">New Vehicle</button>
</div>

<mat-table [dataSource]="dataSource" class="width-table">
  <ng-container matColumnDef="id">
    <mat-header-cell *matHeaderCellDef>No.</mat-header-cell>
    <mat-cell *matCellDef="let row">{{ row.id }}</mat-cell>
  </ng-container>

  <ng-container matColumnDef="registrationNumber">
    <mat-header-cell *matHeaderCellDef>Registraion Number</mat-header-cell>
    <mat-cell *matCellDef="let row">{{ row.registrationNumber }}</mat-cell>
  </ng-container>

  <ng-container matColumnDef="brand">
    <mat-header-cell *matHeaderCellDef>Brand</mat-header-cell>
    <mat-cell *matCellDef="let row">{{ row.brand }}</mat-cell>
  </ng-container>

  <ng-container matColumnDef="currentKm">
    <mat-header-cell *matHeaderCellDef>Current Km</mat-header-cell>
    <mat-cell *matCellDef="let row">{{ row.currentKm }}</mat-cell>
  </ng-container>

  <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
  <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
</mat-table>


<mat-card>
  <app-vehicle-dialog></app-vehicle-dialog>
</mat-card>
```

vehicle.component.ts

```
  displayedColumns: string[] = ['id', 'registrationNumber', 'brand', 'currentKm'];

  vehicles: Vehicle[] = [
    new Vehicle(1, '13442-a-6', 'Volvo', 157000),
    new Vehicle(2,  '6497-b-8', 'Ford', 225867),
    new Vehicle(3,  '24761-c-13', 'Renault', 1482)
  ];

  dataSource: MatTableDataSource<Vehicle>;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.vehicles);
  }
```

### Vehicle dialog

htlm:
```
<form class="example-form">

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Registration Number</mat-label>
    <input matInput placeholder="Registration Number">
  </mat-form-field>

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Brand</mat-label>
    <input matInput placeholder="Brand">
  </mat-form-field>

  <mat-form-field fxFlex floatLabel="auto"  class="example-full-width">
    <mat-label>Current Km</mat-label>
    <input matInput placeholder="Current Km">
  </mat-form-field>


  <div class="button-row">
    <button mat-flat-button color="primary">Save</button>
  </div>
</form>
```
