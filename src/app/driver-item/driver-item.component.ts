import {Component, Input, OnInit} from '@angular/core';
import {Driver} from '../model/driver';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {DriverService} from '../services/driver.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-driver-item',
  templateUrl: './driver-item.component.html',
  styleUrls: ['./driver-item.component.css']
})
export class DriverItemComponent implements OnInit {

  @Input() driver: Driver;

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

  getImgContent(img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }

  onClick(id: number): void{
    this.driverService.driverSelected.next(this.driver);
    this.router.navigate(['/drivers', id]);
  }
}
