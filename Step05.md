# Step 05 : Services
 
### create services

```sh
$ ng g s services/driver

$ ng g s services/vehicle
```

### Create list of drivers and vehicles in the services

**Vehicle Service**

Add list of Vehicles in the vehicle service

```
  vehicles: Vehicle[] = [
    new Vehicle(1, '13442-a-6', 'Volvo', 157000),
    new Vehicle(2,  '6497-b-8', 'Ford', 225867),
    new Vehicle(3,  '24761-c-13', 'Renault', 1482)
  ];

  getVehicles(): Vehicle[]{
    return this.vehicles;
  }
```

**Driver Service**

Add list of drivers in the driver service

```
  drivers = [];

  constructor(private vehicleService: VehicleService) {
    const vehicles = this.vehicleService.getVehicles();

    this.drivers =  [
      new Driver(1, 'Arbi', 'Ahmed', '13456/b1',
        vehicles[0], 'assets/img/driver1.jpg'),
      new Driver(2, 'Charaf', 'Hamid', '176546/b3',
        vehicles[1], 'assets/img/driver2.jpeg'),
      new Driver(3, 'Jilali', 'Jawad', '94821/f6',
        vehicles[2], 'assets/img/driver3.png')
    ];

  }

  getDrivers(): Driver[]{
    return this.drivers;
  }
```


### Using list from services

change the existing code of these components by:

**Driver List**

```
  drivers: Driver[] =  [];

  constructor(private sanitizer: DomSanitizer, private driverService: DriverService) {
  }

  ngOnInit(): void {
    this.drivers = this.driverService.getDrivers();
  }
```
**Driver Details**

```
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicles = this.vehicleService.getVehicles();
  }
```

**Vehicle**

```
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
  }

  onVehicleAdded(vehicle: Vehicle): void {
    this.vehicleService.getVehicles().push(vehicle);
    this.dataSource = new MatTableDataSource(this.vehicleService.getVehicles());
  }
```


### Using services for cross-component communication

create an eventEmitter in the driver service.

```
driverSelected = new EventEmitter<Driver>();
```

In the Item component we remove the output property and change the onClick method in order to use the event Emitter of the service by putting the driver on it.

```
  onClick(): void{
    this.driverService.driverSelected.emit(this.driver);
  }
```

In the list component html file we remove the eventbinding:

```
  <app-driver-item
    *ngFor="let drv of drivers"
    [driver]="drv"></app-driver-item>
```

And we remove the output property too from the typescript file, and the onDriverSelected method


In the Driver component we subscribe to the event Emitter of the service to listen at the driver event  Emitter:

```
  constructor(private studentService: DriverService) { }

  ngOnInit(): void {
    this.studentService.driverSelected.subscribe(
      (driver: Driver) => {
        this.currentDriver = driver;
      }
    );
  }
```

and we remove the eventBinding from the html file:

```
<mat-card>
  <app-driver-list></app-driver-list>
</mat-card>
```
