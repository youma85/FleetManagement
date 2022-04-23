# Step 08 : Cleaning code & Observables

### Cleaning code

remove pageSelected event handler from the app component:
```
<app-navbar></app-navbar>
```

and:

```
  loadedPage = 'drivers';

  onNavigate(page: string): void {
    this.loadedPage = page;
  }
```

Also, remove unused Imports from DriverItemComponent, DriverListComponent and VehicleDialogComponent.

### Adding subject

replace EventEmitter by Subject in the driver service, for example:

```
driverSelected = new Subject<Driver>();
```

In the driver item change the emit by next method:
```
this.driverService.driverSelected.next(this.driver);
```
