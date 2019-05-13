export interface ICompany {
    id?: any;
    companyName?: string;
    companyDomainList?: any[];
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class Company implements ICompany {
    constructor(
        public id?: any,
        public companyName?: string,
        public companyDomainList?: any[],
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date
    ) {
        this.id = id ? id : null;
        this.companyName = companyName ? companyName : null;
        this.companyDomainList = companyDomainList ? companyDomainList : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
    }
}
