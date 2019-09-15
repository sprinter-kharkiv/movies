import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyTitle'
})
export class PrettyTitlePipe implements PipeTransform {

  transform(value: string): string {
    const newVal = value.replace(/[^\w\s]/gi, '');
    return newVal.charAt(1).toUpperCase() + newVal.slice(2);
  }

}
