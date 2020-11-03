import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverItemComponent } from './driver-item.component';

describe('DriverItemComponent', () => {
  let component: DriverItemComponent;
  let fixture: ComponentFixture<DriverItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
