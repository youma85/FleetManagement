# Step 10 : Firebase

### Create Firebase Account and project

On the firebase console create a new project.

Go to the storage page, and Click on Start.

Create a folder, and name it: images

### Use firebase storage to store Images

On Rules tab over the Storage page allow read and write without authentication:

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;//: if request.auth != null;
    }
  }
}
```

and publish the modification


### Install the angular Firebase library

```sh
> ng add @angular/fire
```

choose the project in firebase recently created.

### Build the project

```sh
> ng build
```


will create a dist directory

### Deploy the application

```sh
> ng deploy
```

### Create web application on firebase

Go to the home page and click on "Add an application"

Choose Web.

And Write an application Name: FleetManagement.

Go to settings of the project, and in the "your applications" section, choose Configuration, and copy it to the environnement files:

```
export const environment = {
  production: true,
  firebase: {
    apiKey: '**********************',
    authDomain: '**********************',
    databaseURL: '**********************',
    projectId: '**********************',
    storageBucket: '**********************',
    messagingSenderId: '**********************',
    appId: '**********************',
    measurementId: '**********************'
  }
};
```

### configure sharedModule
add AngularFireModule and AngularFireStorageModule:

```
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
```


