import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as data from '../app/mock-data/all-comp-request.json';
export class FakeBackendService implements InMemoryDbService {
    createDb() {
        let sharedRequest = [
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
            data
        };
    }
}
