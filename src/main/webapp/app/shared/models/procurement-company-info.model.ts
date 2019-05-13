
export interface IProcurementCompanyInfo {
    employees?: number;
    headQuaters?: string;
    phoneNumber?: string;
    sales?: number;
    established?: number;
    summary?: string;
    cfo?: string;
    vicePresident?: string;
    website?: string;
    facebook?: string;
    linkedIn?: string;
    naics_1_code?: string; 
    chief_executive_officer_name?: string;
    dunsNumber?: any;
    duns_number?: any;
    business_name?: any;


}

export class ProcurementCompanyInfo  {
    employees?: number;
    headQuaters?: string;
    phoneNumber?: string;
    sales?: number;
    established?: number;
    summary?: string;
    cfo?: string;
    vicePresident?: string;
    website?: string;
    facebook?: string;
    linkedIn?: string;
    naics_1_code?: string; 
    chief_executive_officer_name?: string;
    dunsNumber? : any;
    duns_number?: any;
    business_name?: any;
    

    constructor(obj: IProcurementCompanyInfo) {
        if (obj.employees!==undefined && obj.employees!==null){
            this.employees = obj.employees;
        }
        if (obj.headQuaters!==undefined && obj.headQuaters!==null){
            this.headQuaters = obj.headQuaters;
        }
        if (obj.phoneNumber!==undefined && obj.phoneNumber!==null){
            this.phoneNumber = obj.phoneNumber;
        }
        if (obj.sales!==undefined && obj.sales!==null){
            this.sales = obj.sales;
        }
        if (obj.established!==undefined && obj.established!==null){
            this.established = obj.established;
        }
        if (obj.summary!==undefined && obj.summary!==null){
            this.summary = obj.summary;
        }
        if (obj.cfo!==undefined && obj.cfo!==null){
            this.cfo = obj.cfo;
        }
        if (obj.vicePresident!==undefined && obj.vicePresident!==null){
            this.vicePresident = obj.vicePresident;
        }
        if (obj.website!==undefined && obj.website!==null){
            this.website = obj.website;
        }
        if (obj.facebook!==undefined && obj.facebook!==null){
            this.facebook = obj.facebook;
        }
        if (obj.linkedIn!==undefined && obj.linkedIn!==null){
            this.linkedIn = obj.linkedIn;
        }
        if (obj.naics_1_code!==undefined && obj.naics_1_code!==null){
            this.naics_1_code = obj.naics_1_code;
        }
        if (obj.chief_executive_officer_name!==undefined && obj.chief_executive_officer_name!==null){
            this.chief_executive_officer_name = obj.chief_executive_officer_name;
        }
        if (obj.dunsNumber!==undefined && obj.dunsNumber!==null){
            this.dunsNumber = obj.dunsNumber;
        }
        if (obj.duns_number!==undefined && obj.duns_number!==null){
            this.duns_number = obj.duns_number;
        }
        if (obj.business_name!==undefined && obj.business_name!==null){
            this.business_name = obj.business_name;
        }
    }
}

