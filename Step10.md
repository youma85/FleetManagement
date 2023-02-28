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

### Install the firebase tools library

```sh
npm i -g firebase-tools@compatibleVersion
```

Then login with:

```sh
firebase login
```

### Install the angular Firebase library

```sh
ng add @angular/fire
```

choose the project in firebase recently created.


### Deploy the application

```sh
> ng deploy
```

### configure sharedModule
add AngularFireModule and AngularFireStorageModule:

```
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
```

Depending on the version of @angular/fire these files can be located on: 
```
@angular/fire
```
or 
```
@angular/fire/compat
```
