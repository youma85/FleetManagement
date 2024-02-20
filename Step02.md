# Step 02 : Directives
 
### Create new custom directive

Creat new directive to apply Shadow effect to Driver card element

```sh
ng g d utils/shadow
```

Add the following code :

```
import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShadow]'
})
export class ShadowDirective {

  @HostBinding('style.boxShadow')
  boxShadow = '2px 2px 12px #3f51b5';

  constructor() {
  }

  @HostListener('mouseenter') mouseOver(): any {
    this.boxShadow = '2px 2px 12px #ff4081';
  }

  @HostListener('mouseleave') mouseLeave(): any {
    this.boxShadow = '2px 2px 12px #3f51b5';
  }
}
```

To apply the directive, add the selector appShadow to the mat-card element of the driverList Component:

```
...
    <mat-card class="example-card" *ngFor="let driver of drivers" appShadow>
...
```

### Using ngIf  directive and eventEmitter to add navigation

In the navbar Component add the output, and a method to emit the selected Page:

```
 @Output() pageSelected = new EventEmitter<string>();

 onSelect(page: string): void{
    this.pageSelected.emit(page);
  }
```

In the html file handle the links clicks:
```
  <a mat-button (click)="onSelect('drivers')">Drivers</a>
  <a mat-button (click)="onSelect('vehicles')">Vehicles</a>
```

In the app Component add the following code, to specify the page to Display:
```
  loadedPage = 'drivers';

  onNavigate(page: string): void {
    this.loadedPage = page;
  }
```

And this code on the Html file:
```
<app-navbar (pageSelected)="onNavigate($event)"></app-navbar>
<app-driver *ngIf="loadedPage === 'drivers'"></app-driver>
<app-vehicle *ngIf="loadedPage === 'vehicles'"></app-vehicle>
```
