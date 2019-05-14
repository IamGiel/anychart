import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as sharedRequest from '../app/mock-data/sharedRequest.json';
import * as pendingRequest from '../app/mock-data/pendingRequest.json';
import * as declinedRequest from '../app/mock-data/declinedRequest.json';
import * as CSRHUB from '../app/mock-data/CSRHUB.json';
import * as CSRHUB_2 from '../app/mock-data/CSRHUB_2.json';
import * as CSRHUB_5 from '../app/mock-data/CSRHUB_5.json';
import * as DnB from '../app/mock-data/DnB.json';
import * as DnB_2 from '../app/mock-data/DnB_2.json';
import * as DnB_5 from '../app/mock-data/DnB_5.json';
import * as DOW_JONES_1 from '../app/mock-data/DOW_JONES_1.json';
import * as DOW_JONES_2 from '../app/mock-data/DOW_JONES_2.json';
import * as DOW_JONES_5 from '../app/mock-data/DOW_JONES_5.json';
import * as supplier_details from '../app/mock-data/supplier-details.json';
import * as ratingTrendCode from '../app/mock-data/ratingTrendCode.json';
import * as supplierDetailsbyId from '../app/mock-data/supplierDetailsbyId.json';
import * as supplierDetailsbyId_2 from '../app/mock-data/supplierDetailsbyId_2.json';
import * as supplierDetailsbyId_5 from '../app/mock-data/supplierDetailsbyId_5.json';
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
            CSRHUB_2,
            CSRHUB_5,
            DnB,
            DnB_2,
            DnB_5,
            supplierDetailsbyId,
            supplierDetailsbyId_2,
            supplierDetailsbyId_5,
            supplier_details,
            DOW_JONES_1,
            DOW_JONES_2,
            DOW_JONES_5,
            ratingTrendCode
        };
    }
}
