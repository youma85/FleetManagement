# Step 12 : HTTP

### install json server auth
   
```sh
> npm install -D json-server json-server-auth
```

### create a json file

create a data file that contains vehicles and drivers

**Start the server**

```sh
> json-server-auth src/app/utils/db.json
```

This will expose a Rest API for Vehicles and Drivers on the following url:

  * http://localhost:3000/vehicles
  * http://localhost:3000/drivers


### Add HttpClientModule

Add HttpClientModule to shared Module.

### Manage Vehicles with API

**Driver Service**

Remove list from service, and change all method by using the httpClient Object:

```
  url = 'http://localhost:3000/vehicles';

  vehicles: Vehicle[] = [];
  constructor(private  http: HttpClient) { }

  getVehicles(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  addVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.post(this.url, vehicle);
  }

  getVehicleById(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.patch(`${this.url}/${vehicle.id}`, vehicle);
  }
```

**Vehicle component**

In this component call subscribe to the service methods
```
  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((data: Vehicle[]) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.vehicleService.vehicleChanged.subscribe(() => {
      this.vehicleService.getVehicles().subscribe((data: Vehicle[]) => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }
  ...
  showDataInDialog(id: any): void {
    this.vehicleService.getVehicleById(id).subscribe(value => {
      const dialogRef = this.dialog.open(VehicleDialogComponent, {
        width: '300px',
        data: value
      });
    });
  }
```

**Vehicle Dialog Component**

Change the save method as follow:

```
onSave(form: NgForm): void {
    this.vehicle.registrationNumber = form.value.registrationNumber;
    this.vehicle.brand = form.value.brand;
    this.vehicle.currentKm = form.value.currentKm;

    if (this.editMode){
      this.vehicleService.updateVehicle(this.vehicle).subscribe(value => {
        this.vehicleService.vehicleChanged.next();
        this.dialogRef.close();
      });
    }else {
      this.vehicleService.addVehicle(this.vehicle).subscribe(value => {
        this.vehicleService.vehicleChanged.next();
        this.dialogRef.close();
      });
    }
  }
```

And to handle the exception: `Expression has changed after it was checked`, inject private cdr: ChangeDetectorRef in the constructor, and in the ngAfterViewInit method add the following code:

```
this.cdr.detectChanges();
```

### Manage Vehicles in drivers details

Change `this.vehicles = this.vehicleService.getVehicles();` in the onInit Method by:

```
    this.vehicleService.getVehicles().subscribe((data: Vehicle[]) => {
      this.vehicles = data;
    });
```

### Manage Drivers with API

**Change the db.json**

Put the vehicle object instead of the id in the drivers list, for example:

```
    {
      "id": 0,
      "firstName": "Ahmed",
      "lastName": "Arbi",
      "drivingLicense": "13456/b1",
      "vehicle": {
        "id": 0
      },
      "photo": "images/driver0.png"
    },
```

**Change the driver service in order to communicate with the API**

```
  url = 'http://localhost:3000';

  driverEndPoint = `${this.url}/drivers`;

  constructor(private vehicleService: VehicleService,
              private  http: HttpClient) {
  }

  getDrivers(): Observable<any> {
    return this.http.get<any[]>(this.driverEndPoint);
  }

  getDriver(id: number): Observable<any>{
    return this.http.get<any>(`${this.driverEndPoint}/${id}`);
  }

  saveDriver(driver: Driver): Observable<any>{
    if (driver.id === undefined){
      return this.http.post(this.driverEndPoint, driver);
    } else {
      return  this.http.patch(`${this.driverEndPoint}/${driver.id}`, driver);
    }
  }
```

**In the driver list component change the ngOnInit in order to get drivers from the API**

```
  ngOnInit(): void {
    this.driverService.getDrivers().subscribe((data: Driver[]) => {
      this.drivers = data;
      this.drivers.forEach((driver) => {
        this.vehicleService.getVehicleById(driver.vehicle.id).subscribe(value => {
          driver.vehicle = value;
        });
      });
    });
  }
```

**Driver Details**

Change calls to the methods of the services in order to subscribe to the observables:

```
  saveDriver(): void {
    this.driver = this.driverForm.value;
    if (this.editMode) {
      this.driver.id = this.id;
    }
    if (this.selectedImage) {
      const namePart = this.selectedImage.name.split('.');
      let photoName;
      if (this.driver.id !== undefined) {
        photoName = 'driver' + this.id + '.' + namePart[namePart.length - 1];
      } else {
        this.driverService.getDrivers().subscribe(data => {
          photoName = 'driver' + data.length + '.' + namePart[namePart.length - 1];
        });
      }
      const filePath = `images/${photoName}`;

      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.driver.photo = filePath;
              this.driverService.saveDriver(this.driver).subscribe(response => {
                this.driverService.driverSelected.next(this.driver);
                this.router.navigate(['/drivers']);
              });
            });
          })
        ).subscribe();
    } else {
      this.driver.photo = this.oldPhotoPath;
      this.driverService.saveDriver(this.driver).subscribe(response => {
        this.driverService.driverSelected.next(this.driver);
        this.router.navigate(['/drivers']);
      });
    }
  }

...

  initForm(): void {
      let firstName = '';
      let lastName = '';
      let drivingLicense = '';
      let vehicle;
  
      if (this.editMode) {
        this.driverService.getDriver(this.id).subscribe(driver => {
          firstName = driver.firstName;
          lastName = driver.lastName;
          drivingLicense = driver.drivingLicense;
  
          this.oldPhotoPath = driver.photo;
  
          this.vehicleService.getVehicleById(driver.vehicle.id).subscribe((value: Vehicle) => {
            vehicle = value;
            this.createFormGroup(firstName, lastName, drivingLicense, vehicle);
          });
  
          const ref = this.storage.ref(driver.photo);
          ref.getDownloadURL().subscribe((url) => {
            this.imgSrc = url;
          });
        });
  
      } else {
        this.createFormGroup(firstName, lastName, drivingLicense, vehicle);
        this.imgSrc = 'assets/img/Placeholder.jpg ';
        this.selectedImage = null;
      }
    }

  private createFormGroup(firstName: string, lastName: string, drivingLicense: string, vehicle: string): void {
    this.driverForm = new FormGroup({
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName),
      drivingLicense: new FormControl(drivingLicense),
      vehicle: new FormControl(vehicle),
      photo: new FormControl()
    });
  }
```

In order to solve the problem of the select we have to add a compare function:

```
<mat-select name="vehicle" formControlName="vehicle" [compareWith]="compareFn">
```

```
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  ...
  compareByValue(f1: any, f2: any): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
```

And add a test in the form to show it only if the form is created:

```
<form class="example-form" *ngIf="driverForm" [formGroup]="driverForm" (ngSubmit)="saveDriver()">
```
