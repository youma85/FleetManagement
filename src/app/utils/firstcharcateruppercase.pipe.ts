import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharacterUpperCasePipe'
})
export class FirstCharacterUpperCasePipe implements PipeTransform {

  transform(value: string, ...args: string[]): any {
    if (!value) {
      return value;
    }
    const regex = /\w\S*/g;
    return value.replace(regex, (str: string) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());
  }

}
