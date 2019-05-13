import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { COMPANYLISTS } from './dashboard/company-mockLists';

@Pipe({
    name: 'filterCompanies'
})
export class FilterCompaniesPipe implements PipeTransform {
    private counter = 0;

    transform(companies, searchTerm) {
        this.counter++;
        companies.push(companies);
        console.log('this is companies from pipe service', companies);
        console.log('filter companies count ', this.counter);
        if (!companies || !searchTerm) {
            return companies;
        }
        return companies.filter(company => {
            company.name.toLowerCase().indexOf(searchTerm.toLowerCase() !== -1);
        });
    }
}
