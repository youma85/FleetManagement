import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../model/vehicle';
import {Driver} from '../model/driver';
import {VehicleService} from '../services/vehicle.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DriverService} from '../services/driver.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {
  driver: Driver;

  vehicles: Vehicle[] = [];

  id: number;

  editMode = false;

  driverForm: FormGroup;

  imgSrc: string;

  selectedImage: any = null;

  oldPhotoPath: string;

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  constructor(private vehicleService: VehicleService,
              private driverService: DriverService,
              private route: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((data: Vehicle[]) => {
      this.vehicles = data;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode =  params.id != null;
      this.initForm();
    });
  }

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

  compareByValue(f1: any, f2: any): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
}
