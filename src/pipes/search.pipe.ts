import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      let normalizedName = item.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      let normalizedSearchText = searchText
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return normalizedName.includes(normalizedSearchText);
    });
  }
}
