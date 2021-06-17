# Step 11 : Forms Reactive

### Change the path of photos

Change path of existing driver's photo on the driver service:

the name of the photo will be : driver+id.extension
```
    new Driver(0, 'Arbi', 'Ahmed', '13456/b1', vehicles[0], 'images/driver0.jpg')
```

upload the existing photo with the new names in the images folder.

### Get drivers images of the item page from fireStorage 

create a variable to stock the url of the photo.

And with AngularFireStorage get the Urls of the drivers:

```
  imgSrc: string;

  constructor(private sanitizer: DomSanitizer,
              private driverService: DriverService,
              private router: Router,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    const ref = this.storage.ref(this.driver.photo);
    ref.getDownloadURL().subscribe((url) => {
      this.imgSrc = url;
    });
  }
```  

And in The html file change driver.photo by imgSrc:

```
<img mat-card-image [src]="imgSrc" class="card-image" alt="{{driver.firstName}}" >
```


### Managing Driver Details with reactive forms:

First of all add ReactiveFormsModule to driverModule.

Edit saveDriver on the service, as follows to handle the id of new driver:

```
    saveDriver(driver: Driver): void {
    if (driver.id === undefined){
      driver.id = this.drivers.length;
      this.drivers.push(driver);
    } else {
      this.drivers[driver.id] = driver;
    }
  }
```

* On the DriverDetailsComponent:
    * Remove @Input() from the driver attribut
    * Add the following attribute:
    ```  
    driverForm: FormGroup;
    imgSrc: string;
    selectedImage: any = null;
    oldPhotoPath: string;
   ```
    * Add private storage: AngularFireStorage to the constructor
    * Initialize the form in a separate method:
    ```
  initForm(): void {
      let firstName = '';
      let lastName = '';
      let drivingLicense = '';
      let vehicle;
  
      if (this.editMode) {
        const driver = this.driverService.getDriver(this.id);
        firstName = driver.firstName;
        lastName = driver.lastName;
        drivingLicense = driver.drivingLicense;
        vehicle = driver.vehicle;
        const ref = this.storage.ref(driver.photo);
        this.oldPhotoPath = driver.photo;
        ref.getDownloadURL().subscribe((url) => {
          this.imgSrc = url;
        });
      }
  
      this.driverForm = new FormGroup({
        firstName: new FormControl(firstName),
        lastName: new FormControl(lastName),
        drivingLicense: new FormControl(drivingLicense),
        vehicle: new FormControl(vehicle),
        photo: new FormControl()
      });
      this.imgSrc = 'assets/img/Placeholder.jpg ';
      this.selectedImage = null;
    }
  ```
    * Change the subscription to the parameters i the OnInit Form:
  
  ```
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.driver = this.driverService.getDriver(this.id);
      this.editMode =  params.id != null;
      this.initForm();
    });
    ```
    * Change the save Method as:
    
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
            photoName = 'driver' + this.driverService.getDrivers().length + '.' + namePart[namePart.length - 1];
          }
          const filePath = `images/${photoName}`;
    
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, this.selectedImage).snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  this.driver.photo = filePath;
                  this.driverService.saveDriver(this.driver);
                  this.driverService.driverSelected.next(this.driver);
                  this.router.navigate(['/drivers']);
                });
              })
            ).subscribe();
        } else {
          this.driver.photo = this.oldPhotoPath;
          this.driverService.saveDriver(this.driver);
          this.driverService.driverSelected.next(this.driver);
          this.router.navigate(['/drivers']);
        }
      }
    ```
  
    * And add a method to show A preview of the image
    ```
        showPreview(event: any): void {
            if (event.target.files && event.target.files[0]) {
              const reader = new FileReader();
              reader.onload = (e: any) => this.imgSrc = e.target.result;
              reader.readAsDataURL(event.target.files[0]);
              this.selectedImage = event.target.files[0];
            } else {
              this.imgSrc = 'assets/img/Placeholder.jpg';
              this.selectedImage = null;
            }
          }
    ```
  
* On the Html file:
    * Synchronize the form tag with the driverForm:
    ```
         [formGroup]="driverForm" (ngSubmit)="saveDriver()"
    ```
    * change the NgModel attribute for each control by:
    ```
         formControlName="controlName"
    ```
    * Change the two sections of image by:
    ```
      <section>
        <div>
          <img [src]="imgSrc" width="350px" height="250px" (click)="fileUploader.click()">
        </div>
        <div>
          <input type="file" accept="image/*" formControlName="photo" (change)="showPreview($event)" #fileUploader>
        </div>
      </section>
    ```
    * Change the save button by:
    ```
        <button mat-flat-button color="primary" type="submit">Save</button>
    ```
    
