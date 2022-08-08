/* eslint-disable */
import { CampaignEleConstants } from "../../ConstConfig/CampaignEleConstants";



export function isEmptyOrSpaces(str:any){
    return str === null || str.match(/^ *$/) !== null;
}

export function clearReportingErrorState() {
    const errStateObj = {
        streetNameError: { show: false, errFlyoutIdentifier: CampaignEleConstants.STREETNAME_ERROR , cssAttrib:"proposalSearch error"},
        referenceUrlError: { show: false, errFlyoutIdentifier: CampaignEleConstants.REFURL_ERRPR , cssAttrib:"proposalSearch error"},
    }
    return errStateObj;
}

export function  validURL(myURL:any) {
    var urlregex = new RegExp( "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
      
    return urlregex.test(myURL);
 }

 export function getTablePayload(list:any,getDesktopActions:any,customTitle:any) {
    const tableInput = {
        searchTitle: "Search by address",
        TableTitle: "",
        tableContent: list,
        tableFields: [{
            field: 'id',
            searchable: true,
            displayName: 'id',
            isHidden: true,
            isKey: true
        },
        {
            field: 'address',
            searchable: true,
            displayName: 'Address(es)',
            isHidden: false,
            isKey: false,
            clsName:"autoWrapCells",
            colClsName:"autoWrapCells",
            customTitle:customTitle
            
        },
        {
            field: 'creationTs',
            searchable: false,
            displayName: 'Date',
            isHidden: false,
            isDate:true,
            isKey: false,
            clsName:"",
            colClsName:""
        },
        {
            field: 'status',
            searchable: false,
            displayName: 'Status',
            isHidden: false,
            isKey: false,
            clsName:"",
            colClsName:""
        },
        {
            field: '',
            searchable: false,
            displayName: 'Action',
            isHidden: false,
            isKey: false,
            clsName:"",
            colClsName:"",
            actionMethod: getDesktopActions
        }
        ],
        bordered: false,
        multiColumnSearch: false,
        showPagination: true,
        showSearch: true,
        maxRowSize: 25,
        sortedCol: 'creationTs',
        sortedOrder: 'desc'
    };
    const tableInputSmall = {
        tableContent: list,
        tableFields: [{
            field: 'requester',
            searchable: true,
            displayName: 'Requester',
            isHidden: false,
            isKey: true
        }
        ],
        dispNames: { "creationTs": "Date : ", "status": "Status: ", "address":"Address (es)" },
        actionMethod:getDesktopActions,
        bordered: false,
        multiColumnSearch: false,
        showPagination: true,
        showSearch: true,
        maxRowSize: 25,
        sortedCol: '',
        sortedOrder: 'desc'
    };

    return {desktop:tableInput,device:tableInputSmall};
 }