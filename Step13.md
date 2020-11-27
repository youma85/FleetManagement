# Step 13 : Authentication

### Create Auth Page

>ng g c auth

```
<mat-card>
  <mat-card-content>
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <h2>Log In</h2>
      <mat-form-field class="full-width-input">
        <input matInput placeholder="Email" name="email"  ngModel  required email>
        <mat-error>
          Please provide a valid email address
        </mat-error>
      </mat-form-field>
      <mat-form-field class="full-width-input">
        <input matInput type="password" placeholder="Password" name="password" ngModel  required minlength="6">
        <mat-error>
          Please provide a valid password
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!f.valid">{{ isLoginMode? 'login': 'Sign Up'}}</button>
      |
      <button mat-raised-button color="primary" (click)="onSwitchMode()" type="button">Switch to {{ !isLoginMode? 'login': 'Sign Up'}}</button>
    </form>
  </mat-card-content>
</mat-card>
```

Typescript:
```
  isLoginMode = true;

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    console.log(authForm.value);
  }

```


add its route in the app-routing module:

```
{path: 'login', component: AuthComponent}
```

and the link in the navbar:

```
<a mat-raised-button  routerLink="/login" color="accent">Sign Up</a>
```

### Configure the auth server

for more information visit: https://www.npmjs.com/package/json-server-auth

create server routes file with the following content:

```
{
  "users": 600,
  "vehicles": 660,
  "drivers": 660
}
```

add users array to db file


Restart the server with:
>json-server-auth src/app/utils/db.json -r src/app/utils/routes.json

### Add SignUp Request

create new service auth:

> ng g s services/auth

In this service I create a method that send a Post request to server, and return a token:
```
interface AuthResponseData {
  accessToken:	string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(emailUsr: string, passwordUsr: string): Observable<any> {
    return this.http.post<AuthResponseData>('http://localhost:3000/register',
      {
        email: emailUsr,
        password: passwordUsr
      });
  }
}
```

In the auth component I will use the method created to sign up:

```
  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(email, password).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }

    authForm.reset();
  }
```

### Add Login Request

add a login method on the auth service:

```
  login(emailUsr: string, passwordUsr: string): Observable<any> {
    return this.http.post<AuthResponseData>('http://localhost:3000/login',
      {
        email: emailUsr,
        password: passwordUsr
      });
  }
```

Handle Both methods on the auth component:

```
errorMsg: string;

constructor(private authService: AuthService,
          private router: Router) { }

onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      data => {
        this.router.navigate(['/']).then();
      },
      error => {
        this.errorMsg = error.error;
      }
    );
  }
```

Handle error message:
```
    <mat-error *ngIf="errorMsg">
      {{errorMsg}}
    </mat-error>
``` 

### Creating & storing user

Create a new class user

```
export class User {
  constructor(
    public email: string,
    public token: string
  ) {}
}
```
When login or signing up store user data returned by the api in a subject:

```
  user = new Subject<User>();
  
  ...
  
  login(emailUsr: string, passwordUsr: string): Observable<any> {
    return this.http.post<AuthResponseData>('http://localhost:3000/login',
      {
        email: emailUsr,
        password: passwordUsr
      }).pipe(
      tap(resDat => {
        this.handleAuthentication(emailUsr, resDat.accessToken);
      }));
  }

  private handleAuthentication(email: string, token: string): void {
    const usr = new User(email, token);
    this.user.next(usr);
  }
```

### Manage links according to authentication

On navbar component handle the links according to the authentication:

```
  isAuthenticated = false;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
```

```
  <a mat-button routerLink="/drivers" routerLinkActive="active" *ngIf="isAuthenticated">Drivers</a>
  <a mat-button routerLink="/vehicles" routerLinkActive="active" *ngIf="isAuthenticated">Vehicles</a>
  <a mat-raised-button routerLink="/login" color="warn" *ngIf="!isAuthenticated">Sign Up</a>
  <a mat-raised-button routerLink="/login" color="warn" *ngIf="isAuthenticated">Logout</a>
```

### Adding the Token to Outgoing Requests

Create an interceptor to handle outgoing requests:

> ng g s services/auth-interceptor

```
export class AuthInterceptorService {

  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {

        // for login and sign up request the not add token
        if (!user){
          return next.handle(req);
        }

        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.token}`
          })
        };
        const modifiedReq = req.clone(httpOptions);

        return next.handle(modifiedReq);
      }));
  }
}
```

add it to provider array of app.module:

```
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
```

Change the subject by BehaviourSubject in th authSevice:

```
user = new BehaviorSubject<User>(null);
```

### Adding Logout

On the auth service add logout method:
```
  logout(): void {
    this.user.next(null);
  }
```

and In the navbar call this method:
```
<a mat-raised-button (click)="onLogout()" color="accent" *ngIf="isAuthenticated">Logout</a>
```

```
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
```

### Auto login

In the auth Service, store the mail and token on the localStorage when login or signing up:

```
  private handleAuthenctication(email: string, token: string) {
    const usr = new User(email, token);
    this.user.next(usr);
    // convert the usr to string and store it to localStorage
    localStorage.setItem('userData', JSON.stringify(usr));
  }
```

Also add a method that verify if the user Data are stored in the localStorage, if so inject them into the behaviourSubjet:

```
  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    this.user.next(userData);
  }
```

Call this method on the app component
```
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
```

### Remove data from localStorage when logout

In the authService:
```
  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
  }
```

### Adding an Auth guard

create a canActivate guards to handle routes:

> ng g s services/auth-guard

```
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !user ? false : true;

        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
```

and configure it on the driver and vehicle routes:
```
  {path: 'drivers', component: DriverComponent, canActivate: [AuthGuardService], children: [
  ...
  {path: 'vehicles', component: VehicleComponent, canActivate: [AuthGuardService]},
```
