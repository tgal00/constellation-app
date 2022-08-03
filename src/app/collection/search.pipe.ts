import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: string[], keyword: string): string[] {
    if(!value||keyword.length ==0)
    return value
    return value.filter(v => v.toLowerCase().includes(keyword.toLowerCase()));

  }


}
