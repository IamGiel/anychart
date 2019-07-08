import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchPipe'
    //pure: false
})
export class searchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        console.log(searchText);
        console.log(items);

        return items.filter(
            // item => item.supplierName.indexOf(searchText) !== -1
            item => item.supplierName.toLowerCase().includes(searchText)
        );
    }
}
