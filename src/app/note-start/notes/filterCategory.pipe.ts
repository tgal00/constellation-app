import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './note.model';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: Note[], keyword: string): Note[] {
    if(!value||keyword.length ==0)
    return value
    return value.filter(v => v.noteCategory.toLowerCase().includes(keyword.toLowerCase()));

  }


}
