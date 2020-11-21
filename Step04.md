# Step 04 : Pipes
 
### Transform lastname to upper case

In the driver item component, add an upper case pipe to the lastName:

```
<mat-card-title>{{driver.firstName}} {{driver.lastName | uppercase}}</mat-card-title>
```

### Create a new pipe that set only the first Character to UpperCase

```sh
$ ng g p utils/firstcharcateruppercase
```

In the pipe class add the following code:

```
  transform(value: string, ...args: string[]): any {
    if (!value) {
      return value;
    }
    const regex = /\w\S*/g;
    return value.replace(regex, (str: string) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());
  }
```

and apply the pipe to the firstName in the item page

```
{{driver.firstName | firstCharacterUpperCasePipe}}
```
