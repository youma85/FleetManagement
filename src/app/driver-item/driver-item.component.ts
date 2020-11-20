import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Driver} from '../model/driver';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-driver-item',
  templateUrl: './driver-item.component.html',
  styleUrls: ['./driver-item.component.css']
})
export class DriverItemComponent implements OnInit {

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
}
