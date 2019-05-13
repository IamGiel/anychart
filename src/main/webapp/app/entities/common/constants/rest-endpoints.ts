export class RestEndpointConstants {
    public static RestEndpoints = {
        endpoints: [
            {
                name: 'getDnbRatingTrendCodeDetails',
                url: '/compliance/api/ratingTrendCodeDetailses?size=50',
                method: 'get'
            },
            {
                name: 'getDnbRating',
                url: '/compliance/api/data-point-responses/{parameter}/DNB',
                method: 'get'
            },
            {
                name: 'getProcurementCompanyInfo',
                url: '/suppliers/api/search/suppliers?search={parameter}',
                method: 'get'
            },
            {
                name: 'saveCompanyInfo',
                url: '/compliance/api/supplier-document-requests  ',
                method: 'post'
            },
            {
                name: 'curatedFileUpload',
                url: '/compliance/api/file/process/{parameter}',
                method: 'post'
            },
            {
                name: 'createCompliance',
                url: '/compliance/api/compliance-requests?fileUuid={parameter}',
                method: 'get'
            },
            {
                name: 'declineRequest',
                url: '/compliance/api/compliance-requests/declined-status',
                method: 'put'
            },
            {
                name: 'getFAQs',
                url: '/compliance/api/faq/{parameter}',
                method: 'get'
            },
            {
                name: 'getSignUpCountries',
                url: '/usermanagement/api/countries ',
                method: 'get'
            },
            {
                name: 'registerUser',
                url: '/usermanagement/api/user?type={parameter}',
                method: 'post'
            },
            {
                name: 'getSupplierList',
                url: '/compliance/api/search/compliance-requests/uploaded-suppliers/{parameter}',
                method: 'post'
            },
            {
                name: 'checkSupplierClaim',
                url: '/compliance/api/supplier-claim/{parameter}',
                method: 'get'
            },
            {
                name: 'claimSupplier',
                url: '/compliance/api/supplier-claim/{parameter}',
                method: 'post'
            },
            {
                name: 'getCSRHubRating',
                url: '/compliance/api/data-point-responses/{parameter}/CSRHUB',
                method: 'get'
            },
            {
                name: 'updateSupplierList',
                url: '/compliance/api/supplier/{parameter}',
                method: 'put'
            },
            {
                name: 'updateSupplierByCatManager',
                url: '/compliance/api/supplier-contact/{parameter}',
                method: 'put'
            },
            {
                name: 'getAllcompanies',
                url: '/usermanagement/api/companies',
                method: 'get'
            },
            {
                name: 'getUserByCompany',
                url: '/usermanagement/api/company/{parameter}/users',
                method: 'get'
            },
            {
                name: 'supplierFileUpload',
                url: 'compliance/api/file/process?email={parameter}',
                method: 'post'
            },
            {
                name: 'requestCompPackage',
                url: 'compliance/api/request-compliance-packages',
                method: 'post'
            },
            {
                name: 'createComplianceRequest',
                url: 'compliance/api/compliance-requests',
                method: 'post'
            },
            {
                name: 'getDowJonesRating',
                url: '/compliance/api/data-point-responses/{parameter}/DOW_JONES',
                method: 'get'
            },
            {
                name: 'getQuestionnaire',
                url: '/compliance/api/question-response/{parameter}',
                method: 'get'
            },
            {
                name: 'saveQuestionnaire',
                url: '/compliance/api/question-response/{parameter}',
                method: 'post'
            },
            {
                name: 'getAccountInfo',
                url: ' /compliance/api/compliance-requests/{parameter}/primary-contact',
                method: 'get'
            },
            {
                name: 'getCartStatus',
                url: ' /compliance/api/cart-status-update',
                method: 'put'
            },
            {
                name: 'categoryManagerSupplierFilter',
                url: '/compliance/api/filter/suppliers?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerFilter',
                url: '/compliance/api/filter/category_managers?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerSupplierEmailFilter',
                url: '/compliance/api/filter/supplierEmail?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerCompanyFilter',
                url: '/compliance/api/filter/company?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerSupplierCountryFilter',
                url: '/compliance/api/filter/supplierCountry?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerContactFilter',
                url: '/compliance/api/filter/contact?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerSupplierAddressFilter',
                url: '/compliance/api/filter/supplierAddress?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerSupplierCategoryFilter',
                url: '/compliance/api/filter/supplierCategory?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerSupplierPhoneFilter',
                url: '/compliance/api/filter/supplierPhone?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerDunsNumberFilter',
                url: '/compliance/api/filter/dunsNumber?{parameter}',
                method: 'get'
            },
            {
                name: 'categoryManagerSpendFilter',
                url: '/compliance/api/filter/spend?{parameter}',
                method: 'get'
            },
            {
                name: 'companyInfoQuestionnaireSections',
                url: '/compliance/api/companyQuestionSection/{parameter}',
                method: 'get'
            },
            {
                name: 'companyInfoQuestionnaireQuestions',
                url: '/compliance/api/companyQuestion/{parameter}',
                method: 'get'
            },
            {
                name: 'companyInfoQuestionnaireQuestionOptions',
                url: '/compliance/api/options/{parameter}',
                method: 'get'
            },
            {
                name: 'companyInfoQuestionnaireQuestionChild',
                url: '/compliance/api/companyQuestion/child/{parameter}',
                method: 'get'
            },
            {
                name: 'createCompany',
                url: '/usermanagement/api/company-details/',
                method: 'post'
            },
            {
                name: 'getCompanyList',
                url: '/usermanagement/api/companies/list?{parameter}',
                method: 'get'
            },
            {
                name: 'getCompanyDetailsById',
                url: '/usermanagement/api/company-details/{parameter}',
                method: 'get'
            },
            {
                name: 'updateCompany',
                url: '/usermanagement/api/company-update',
                method: 'put'
            },
            {
                name: 'companyInfoAnswers',
                url: '/compliance/api/companyAnswers/{parameter}',
                method: 'put'
            },
            {
                name: 'userlist',
                url: '/usermanagement/api/users?{parameter}',
                method: 'get'
            },
            {
                name: 'companyInfoAdminSave',
                url: '/compliance/api/companyQuestion/{parameter}',
                method: 'put'
            },
            {
                name: 'companyInfoAdminQuestions',
                url: '/compliance/api/companyQuestion/section/{parameter}',
                method: 'get'
            },
            {
                name: 'companyInfoUpload',
                url: '/compliance/api/companyQuestion/uploadFile/{parameter}',
                method: 'post'
            },
            {
                name: 'processFileAdmin',
                url: '/compliance/api/file/process/{parameter}',
                method: 'post'
            },
            {
                name: 'createRequestAdmin',
                url: '/compliance/api/file/compliance-requests?fileUuid={parameter}',
                method: 'get'
            },
            {
                name: 'badgeUpdate',
                url: '/compliance/api/data-point-responses/badge',
                method: 'put'
            }
        ]
    };
}
