export interface IPackageDetails {
    packageId?: number;
    packageName?: string;
    totalPackagePrice?: number;
    packageQty?: number;
    currency?: string;
    unitPrice?: number;
}

export class PackageDetails implements IPackageDetails {
    constructor(
        public packageId?: number,
        public packageName?: string,
        public totalPackagePrice?: number,
        public packageQty?: number,
        public currency?: string,
        public unitPrice?: number
    ) {}
}
