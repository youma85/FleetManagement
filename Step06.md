# Step 06 : Modules
 
### create modules

```sh
$ ng g m shared

$ ng g m driver

$ ng g m vehicle
```

In the shared Module put all shared modules, directives and pipes, don't forget to export all elements:

```
@NgModule({
  declarations: [
    FirstCharacterUpperCasePipe,
    ShadowDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FirstCharacterUpperCasePipe,
    ShadowDirective
  ]
})
export class SharedModule { }
```

Driver feature Module must contain only the driver components

```
@NgModule({
  declarations: [
    DriverComponent,
    DriverListComponent,
    DriverItemComponent,
    DriverDetailsComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DriverComponent,
    DriverListComponent,
    DriverItemComponent,
    DriverDetailsComponent,
  ]
})
export class DriverModule { }
```

And the same thing for vehicle module:

```
@NgModule({
  declarations: [
    VehicleComponent,
    VehicleDialogComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    VehicleComponent,
    VehicleDialogComponent,
  ]
})
export class VehicleModule { }
```

These two module must import the SharedModule

Finally the appModule must now import only the modules:

```
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    VehicleModule,
    DriverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
