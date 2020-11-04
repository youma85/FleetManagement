import {Vehicle} from './vehicle';

export class Driver {
  constructor(public id?: number,
              public firstName?: string,
              public lastName?: string,
              public drivingLicense?: string,
              public vehicle?: Vehicle){}
}
