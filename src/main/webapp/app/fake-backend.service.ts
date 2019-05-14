import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as sharedRequest from '../app/mock-data/sharedRequest.json';
import * as pendingRequest from '../app/mock-data/pendingRequest.json';
import * as declinedRequest from '../app/mock-data/declinedRequest.json';
import * as CSRHUB from '../app/mock-data/CSRHUB.json';
import * as DnB from '../app/mock-data/DnB.json';
import * as DOW_JONES from '../app/mock-data/DOW_JONES.json';
import * as supplier_details from '../app/mock-data/supplier-details.json';
import * as ratingTrendCode from '../app/mock-data/ratingTrendCode.json';
import * as supplierDetailsbyId from '../app/mock-data/supplierDetailsbyId.json';

export class FakeBackendService implements InMemoryDbService {
    createDb() {
        let demoJson = [
            {
                id: 1,
                description: 'Buy Groceries'
            },
            {
                id: 2,
                description: 'Paint the garage'
            }
        ];
        return {
            sharedRequest,
            pendingRequest,
            declinedRequest,
            CSRHUB,
            DnB,
            supplierDetailsbyId,
            supplier_details,
            DOW_JONES,
            ratingTrendCode
        };
    }
}
