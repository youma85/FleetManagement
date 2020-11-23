# Step 07 : Rooting

###Generate routing module

Add a new module
```sh
ng g m app-routing --flat
```

add routes in this modules:

```
const appRoutes: Routes = [
  {path: '', redirectTo: '/drivers', pathMatch: 'full'},
  {path: 'drivers', component: DriverComponent, children: [
      {path: '', component: DriverListComponent},
      {path: 'new', component: DriverDetailsComponent},
      {path: ':id', component: DriverDetailsComponent}
    ]},
  {path: 'vehicles', component: VehicleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
```

In the app component replace existing code by:

```
<app-navbar (pageSelected)="onNavigate($event)"></app-navbar>
<router-outlet></router-outlet>
```

###Adding router Links on navbar

Add router link in the nav bar

```
  <a mat-button routerLink="/drivers" routerLinkActive="active">Drivers</a>
  <a mat-button routerLink="/vehicles" routerLinkActive="active">Vehicles</a>
```

Change style of the active route  

```
.active{
  background-color: #ffd740;
  color: black;
}
```

And remove the unused onSelect method from typescript

###Add redirection to the Details page when clicking on new Driver Button

First of All add RouterModule to the shared Module.

Then on the driver component replace the content by:

```
<mat-card>
  <router-outlet></router-outlet>
</mat-card>
```

Add a new button for adding driver on the driver list Component:

```
<div class="btn">
  <button mat-flat-button color="primary" (click)="onNewDriver()">New Driver</button>
</div>
```

And the click handler method, to navigate to the new route:

```
  constructor(private sanitizer: DomSanitizer,
              private driverService: DriverService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onNewDriver(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
```

###Add creating new driver
On the driver service add the following methods:

```
  getDriver(id: number): Driver {
    return this.drivers[id];
  }

  saveDriver(driver: Driver): void {
    this.drivers.push(driver);
  }
```

Add FormsModule to imports and exports arrays of the shared module.

In the html driver details, for each control, add TwoDataBinding [(ngModel)] and a name, like this:

```
<mat-select name="vehicle" [(ngModel)]="driver.vehicle">
  <mat-option *ngFor="let vehicle of vehicles" [value]="vehicle">
    {{vehicle.brand}}: {{vehicle.registrationNumber}}
  </mat-option>
</mat-select>
```

In the typescipt file add the following code :

```
  id: number;

  editMode = false;

  constructor(private vehicleService: VehicleService,
              private driverService: DriverService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.vehicles = this.vehicleService.getVehicles();
    
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.driver = this.driverService.getDriver(this.id);
      this.editMode =  params.id != null;
      if (!this.editMode){
        this.driver = new Driver();
        this.driver.vehicle = new Vehicle();
      }
    });
  }

  saveDriver(): void {
    this.driverService.saveDriver(this.driver);
    this.driverService.driverSelected.next(this.driver);
    this.router.navigate(['/drivers']);
  }
```

###Handle editing drivers
First of all correct the ids:
```
  new Driver(0, 'Arbi', 'Ahmed', '13456/b1', vehicles[0], 'assets/img/driver1.jpg'),
  new Driver(1, 'Charaf', 'Hamid', '176546/b3', vehicles[1], 'assets/img/driver2.jpeg'),
  new Driver(2, 'Jilali', 'Jawad', '94821/f6', vehicles[2], 'assets/img/driver3.png')
```

change the onClick Method of the driver item in order to redirect to the details page:

```
  onClick(id: number): void{
    this.driverService.driverSelected.emit(this.driver);
    this.router.navigate(['/drivers', id]);
  }
```

html:

```
<button mat-raised-button (click)="onClick(driver.id)">Show</button>
``` 

###Use vehicle-dialog component as a material dialog and manage Vehicles

Change the vehicle Service as following:

```
vehicleChanged = new EventEmitter<void>();

  vehicles: Vehicle[] = [
    new Vehicle(0, '13442-a-6', 'Volvo', 157000),
    new Vehicle(1,  '6497-b-8', 'Ford', 225867),
    new Vehicle(2,  '24761-c-13', 'Renault', 1482)
  ];

  addVehicle(vehicle: Vehicle): Vehicle[]{
    vehicle.id = this.vehicles.length;
    this.vehicles.push(vehicle);
    return this.vehicles;
  }

  getVehicleById(id: any): Vehicle {
    return this.vehicles[id];
  }

  updateVehicle(vehicle: Vehicle): void {
    this.vehicles[vehicle.id] = vehicle;
  }
```

On the sharedModule add MatDialogModule.

On the Vehicle Component remove this code :

```
    <mat-card>
     <app-vehicle-dialog (vehicleAdded)="onVehicleAdded($event)"></app-vehicle-dialog>
   </mat-card>
```

and add click handler on new button and line:

```
<button mat-flat-button color="primary" (click)="openNewDialog()">New Vehicle</button>
...
<mat-row *matRowDef="let row; columns: displayedColumns" (click)="showDataInDialog(row.id)"></mat-row>
```

On typescript inject MatDialog:

```
  constructor(private vehicleService: VehicleService,
              public dialog: MatDialog) { }
```

And open dialog on click handler:

```
  openNewDialog(): void {
    this.dialog.open(VehicleDialogComponent, {
      width: '250px',
      data: new Vehicle()
    });
  }

  showDataInDialog(id: any): void {
    this.dialog.open(VehicleDialogComponent, {
      width: '250px',
      data: this.vehicleService.getVehicleById(id)
    });
  }
```

We gonna also reload datasource when adding or updating:

```
      ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
    
        this.vehicleService.vehicleChanged.subscribe(() => {
          this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
        });
      }
```

Finally, we have to change the vehicle dialog component:

```
  editMode = false;

  vehicle: Vehicle;

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>,
              private vehicleService: VehicleService,
              @Inject(MAT_DIALOG_DATA) public data: Vehicle) {
    this.vehicle = data;
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
```
