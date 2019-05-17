import { InMemoryDbService } from 'angular-in-memory-web-api';
/*import  * as sharedRequest from '../app/mock-data/sharedRequest.json';
import * as pendingRequest from '../mock-data/pendingRequest.json';
import * as declinedRequest from '../app/mock-data/declinedRequest.json';
import * as CSRHUB from '../app/mock-data/CSRHUB.json';
import * as DnB from '../app/mock-data/DnB.json';
import * as DOW_JONES from '../app/mock-data/DOW_JONES.json';
import * as erpDetails from '../app/mock-data/supplier-details.json';
import * as ratingTrendCode from '../app/mock-data/ratingTrendCode.json';
import * as supplierDetailsbyId from '../app/mock-data/supplierDetailsbyId.json';
import * as companyQuestionSection from '../app/mock-data/companyQuestionSection.json';
import * as companyQuestion from '../app/mock-data/companyQuestion.json';
import * as companyChildQuestion from '../app/mock-data/companyChildQuestion.json';*/
var sharedRequest = require('../app/mock-data/sharedRequest.json');
var pendingRequest = require('../app/mock-data/pendingRequest.json');
var declinedRequest = require('../app/mock-data/declinedRequest.json');
var CSRHUB = require('../app/mock-data/CSRHUB.json');
var DnB = require('../app/mock-data/DnB.json');
var DOW_JONES = require('../app/mock-data/DOW_JONES.json');
var erpDetails = require('../app/mock-data/supplier-details.json');
var ratingTrendCode = require('../app/mock-data/ratingTrendCode.json');
var supplierDetailsbyId = require('../app/mock-data/supplierDetailsbyId.json');
var companyQuestionSection = require('../app/mock-data/companyQuestionSection.json');
var companyQuestion = require('../app/mock-data/companyQuestion.json');
var companyChildQuestion = require('../app/mock-data/companyChildQuestion.json');
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
            DOW_JONES,
            ratingTrendCode,
            erpDetails,
            companyQuestionSection,
            companyQuestion,
            companyChildQuestion
        };
    }
}
