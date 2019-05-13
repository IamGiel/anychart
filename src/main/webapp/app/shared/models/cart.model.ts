export interface ICart {
    cartId?: number;
    totalPrice?: number;
    requestCount?: number;
    complianceReqIds?: number[];
    packageDetails?: any[];
}
export class Cart implements ICart {
    constructor(
        public cartId?: number,
        public totalPrice?: number,
        public requestCount?: number,
        public complianceReqIds?: number[],
        public packageDetails?: any[]
    ) {}
}