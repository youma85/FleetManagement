import {Component, Input, OnInit} from '@angular/core';
import {Driver} from '../model/driver';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {DriverService} from '../services/driver.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-driver-item',
  templateUrl: './driver-item.component.html',
  styleUrls: ['./driver-item.component.css']
})
export class DriverItemComponent implements OnInit {

  @Input() driver: Driver;

  constructor(private sanitizer: DomSanitizer,
              private driverService: DriverService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getImgContent(img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }

  onClick(id: number): void{
    this.driverService.driverSelected.next(this.driver);
    this.router.navigate(['/drivers', id]);
  }
}
