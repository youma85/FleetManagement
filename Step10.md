# Step 10 : Firebase

###Create Firebase Account and project

On the firebase console create a new project.

Go to the storage page, and Click on Start.

Create a folder, and name it: images

###Install Firebase CLI globally using 

```sh
> npm install -g firebase-tools
```

###Build the project

```sh
> ng build
```


will create a dist directory

###initialize the connection to your project

```sh
> firebase init
```

With spaceBar choose Hosting and Storage.
Choose Use an existing project
Select the project you previously created on Firebase.
Choose These responses for the other questions:

```
? What do you want to use as your public directory? dist/FleetManagement
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File dist/FleetManagement/index.html already exists. Overwrite? Yes
```

###Install the angular Firebase library

```sh
> ng add @angular/fire
```

choose the project in firebase recently created.

###Deploy the application

```sh
> ng deploy
```

###Use firebase storage to store Images

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

###Create web application on firebase

Go to the home page and click on "Add an application"

Choose Web.

And Write an application Name: FleetManagement.

Go to settings of the project, and in the "your applications" section, choose Configuration, and copy it to the environnement files:

```
export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAq8kx8WagTij4Sjg40-5EnTd2rmN1Dmmw',
    authDomain: 'fleet-51254.firebaseapp.com',
    databaseURL: 'https://fleet-51254.firebaseio.com',
    projectId: 'fleet-51254',
    storageBucket: 'fleet-51254.appspot.com',
    messagingSenderId: '374608718605',
    appId: '1:374608718605:web:7c53708d0d0092a7791e44',
    measurementId: 'G-0W9EMNFFR2'
  }
};
```

###configure sharedModule
add AngularFireModule and AngularFireStorageModule:

```
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
```


