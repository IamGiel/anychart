import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServiceEndpoints } from './service-endpoints';

@Injectable({
    providedIn: 'root'
})
export class FetchData {
    constructor(private serviceEndpoints: ServiceEndpoints) {}

    getDnbRating(param) {
        return this.serviceEndpoints.init().getDnbRating.makeRequest(null, param);
    }

    getDnbRatingTrendCodeDetails() {
        return this.serviceEndpoints.init().getDnbRatingTrendCodeDetails.makeRequest();
    }

    getProcurementCompanyInfo(param) {
        return this.serviceEndpoints.init().getProcurementCompanyInfo.makeRequest(null, param);
    }

    saveCompanyInfo(payload) {
        return this.serviceEndpoints.init().saveCompanyInfo.makeRequest(payload, null, null, null, true);
    }

    curatedFileUpload(payload, param) {
        return this.serviceEndpoints.init().curatedFileUpload.makeRequest(payload, param, null);
    }

    createCompliance(param) {
        return this.serviceEndpoints.init().createCompliance.makeRequest(null, param);
    }

    declineRequest(payload) {
        return this.serviceEndpoints.init().declineRequest.makeRequest(payload, null, null, null, true);
    }
    getFAQs(param) {
        return this.serviceEndpoints.init().getFAQs.makeRequest(null, param);
    }
    getSignUpCountries() {
        return this.serviceEndpoints.init().getSignUpCountries.makeRequest();
    }
    registerUser(payload, param) {
        return this.serviceEndpoints.init().registerUser.makeRequest(payload, param);
    }
    getSupplierList(payload, param) {
        return this.serviceEndpoints.init().getSupplierList.makeRequest(payload, param);
    }
    checkSupplierClaim(param) {
        return this.serviceEndpoints.init().checkSupplierClaim.makeRequest(null, param, null, null, true);
    }
    claimSupplier(param) {
        return this.serviceEndpoints.init().claimSupplier.makeRequest(null, param, null, null, true);
    }

    getCSRHubRating(param) {
        return this.serviceEndpoints.init().getCSRHubRating.makeRequest(null, param);
    }
    updateSupplierList(payload, param) {
        return this.serviceEndpoints.init().updateSupplierList.makeRequest(payload, param);
    }
    updateSupplierByCatManager(payload, param) {
        return this.serviceEndpoints.init().updateSupplierByCatManager.makeRequest(payload, param);
    }
    getAllcompanies() {
        return this.serviceEndpoints.init().getAllcompanies.makeRequest();
    }
    getUserByCompany(param) {
        return this.serviceEndpoints.init().getUserByCompany.makeRequest(null, param);
    }
    supplierFileUpload(payload, param) {
        return this.serviceEndpoints.init().supplierFileUpload.makeRequest(payload, param);
    }
    requestCompPackage(payload) {
        return this.serviceEndpoints.init().requestCompPackage.makeRequest(payload, null);
    }
    createComplianceRequest(payload) {
        return this.serviceEndpoints.init().createComplianceRequest.makeRequest(payload, null);
    }
    getDowJonesRating(param) {
        return this.serviceEndpoints.init().getDowJonesRating.makeRequest(null, param);
    }
    getQuestionnaire(param) {
        return this.serviceEndpoints.init().getQuestionnaire.makeRequest(null, param);
    }
    saveQuestionnaire(payload, param) {
        let header = new HttpHeaders();
        header.append('Content-Type', undefined);
        return this.serviceEndpoints.init().saveQuestionnaire.makeRequest(payload, param);
    }

    getAccountInfo(param) {
        return this.serviceEndpoints.init().getAccountInfo.makeRequest(null, param);
    }
    getCartStatus(payload) {
        return this.serviceEndpoints.init().getCartStatus.makeRequest(payload, null);
    }
    categoryManagerSupplierFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'supplierFrom=' + from + '&size=' + size + '&supplierSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerSupplierFilter.makeRequest(null, param);
    }
    categoryManagerFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'categoryMangerFrom=' + from + '&size=' + size + '&managerSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerFilter.makeRequest(null, param);
    }

    categoryManagerSupplierEmailFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'emailFrom=' + from + '&size=' + size + '&emailSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerSupplierEmailFilter.makeRequest(null, param);
    }

    categoryManagerCompanyFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'companyFrom=' + from + '&size=' + size + '&companySearch=' + search;
        return this.serviceEndpoints.init().categoryManagerCompanyFilter.makeRequest(null, param);
    }

    categoryManagerSupplierCountryFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'countryFrom=' + from + '&size=' + size + '&countrySearch=' + search;
        return this.serviceEndpoints.init().categoryManagerSupplierCountryFilter.makeRequest(null, param);
    }

    categoryManagerContactFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'contactFrom=' + from + '&size=' + size + '&contactSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerContactFilter.makeRequest(null, param);
    }

    categoryManagerSupplierAddressFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'addressFrom=' + from + '&size=' + size + '&addressSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerSupplierAddressFilter.makeRequest(null, param);
    }

    categoryManagerSupplierCategoryFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'categoryFrom=' + from + '&size=' + size + '&categorySearch=' + search;
        return this.serviceEndpoints.init().categoryManagerSupplierCategoryFilter.makeRequest(null, param);
    }

    categoryManagerSupplierPhoneFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'phoneFrom=' + from + '&size=' + size + '&phoneSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerSupplierPhoneFilter.makeRequest(null, param);
    }

    categoryManagerDunsNumberFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'dunsNumberFrom=' + from + '&size=' + size + '&dunsNumberSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerDunsNumberFilter.makeRequest(null, param);
    }

    categoryManagerSpendFilter(size, from, search, mode) {
        if (from == null) {
            from = '';
        }
        if (search == null) {
            search = '';
        }
        const param = 'spendFrom=' + from + '&size=' + size + '&spendSearch=' + search;
        return this.serviceEndpoints.init().categoryManagerSpendFilter.makeRequest(null, param);
    }

    companyInfoQuestionnaireSections(param) {
        return this.serviceEndpoints.init().companyInfoQuestionnaireSections.makeRequest(null, param);
    }

    companyInfoQuestionnaireQuestions(param) {
        return this.serviceEndpoints.init().companyInfoQuestionnaireQuestions.makeRequest(null, param);
    }

    companyInfoQuestionnaireQuestionOptions(param) {
        return this.serviceEndpoints.init().companyInfoQuestionnaireQuestionOptions.makeRequest(null, param);
    }

    companyInfoQuestionnaireQuestionChild(param) {
        return this.serviceEndpoints.init().companyInfoQuestionnaireQuestionChild.makeRequest(null, param);
    }
    createCompany(payload) {
        return this.serviceEndpoints.init().createCompany.makeRequest(payload, null);
    }
    getCompanyList(param) {
        return this.serviceEndpoints.init(param).getCompanyList.makeRequest(null, param);
    }
    getCompanyDetailsById(param) {
        return this.serviceEndpoints.init(param).getCompanyDetailsById.makeRequest(null, param);
    }
    updateCompany(payload) {
        return this.serviceEndpoints.init().updateCompany.makeRequest(payload, null);
    }
    companyInfoAnswers(payload, param) {
        return this.serviceEndpoints.init().companyInfoAnswers.makeRequest(payload, param);
    }
    getUserList(param) {
        return this.serviceEndpoints.init().userlist.makeRequest(null, param);
    }
    companyInfoAdminSave(payload, param) {
        return this.serviceEndpoints.init().companyInfoAdminSave.makeRequest(payload, param);
    }
    companyInfoAdminQuestions(param) {
        return this.serviceEndpoints.init().companyInfoAdminQuestions.makeRequest(null, param);
    }
    companyInfoUpload(payload, param) {
        return this.serviceEndpoints.init().companyInfoUpload.makeRequest(payload, param, null, null, true);
    }
    processFileAdmin(payload, param) {
        return this.serviceEndpoints.init().processFileAdmin.makeRequest(payload, param, null, null, true);
    }
    createRequestAdmin(param) {
        return this.serviceEndpoints.init().createRequestAdmin.makeRequest(null, param);
    }
    badgeUpdate(payload) {
        return this.serviceEndpoints.init().badgeUpdate.makeRequest(payload, null);
    }
    getAllRequest(param) {
        if (param.toLowerCase() == 'shared') {
            return this.serviceEndpoints.init().getSharedRequest.makeRequest(null, param);
        } else if (param.toLowerCase() == 'pending') {
            return this.serviceEndpoints.init().getPendingRequest.makeRequest(null, param);
        } else if (param.toLowerCase() == 'declined') {
            return this.serviceEndpoints.init().getDeclinedRequest.makeRequest(null, param);
        }
    }
    getERPDetails(param) {
        return this.serviceEndpoints.init().getERPDetails.makeRequest(null, param);
    }
}
