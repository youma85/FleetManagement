import {Component, OnInit} from '@angular/core';
import {Driver} from '../model/driver';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {DriverService} from '../services/driver.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] =  [];

  // DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS)
  // by sanitizing values to be safe to use in the different DOM contexts.
  constructor(private sanitizer: DomSanitizer,
              private driverService: DriverService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.drivers = this.driverService.getDrivers();
  }

  getImgContent(img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }

  onNewDriver(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
