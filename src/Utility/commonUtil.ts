/* eslint-disable */
import { UserOps } from '../ConstConfig/UserOps';
import { NavBarConstants } from '../ConstConfig';

export function isDataExist(obj: any, attrib: any) {
  let isValPresent = false;
  if (!obj) {
    return false;
  }
  if (obj && obj.hasOwnProperty(attrib) && obj[attrib] && obj[attrib] !== '') {
    isValPresent = true;
  }
  return isValPresent;
}

export function getUnique(array: any) {
  const uniqueArray = [];
  // Loop through array values
  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}

export function getMenuPerRole() {
  return {
    [UserOps.CRMUPLOADER]: [
      NavBarConstants.DASHBOARDSLICK,
      NavBarConstants.CRMSLICK
    ],
    [UserOps.ADMIN]: [
      NavBarConstants.ADMINSLICK,
      NavBarConstants.DASHBOARDSLICK,
    ],
    [UserOps.AUDIENCEBUILDER]: [
      NavBarConstants.DASHBOARDSLICK,
      NavBarConstants.AUDIENCELISTSLICK,
    ],
    [UserOps.CAMPAIGNREQ]: [
      NavBarConstants.DASHBOARDSLICK,
      NavBarConstants.INSIGHTSLICK
    ],
    [UserOps.BETATESTER]: [
      NavBarConstants.DASHBOARDSLICK,
    ],
    [UserOps.ADOPS]: [
      NavBarConstants.DASHBOARDSLICK,
    ],
    [UserOps.REPORTINGDIGITAL]:
      [
        NavBarConstants.DASHBOARDSLICK,
        NavBarConstants.REPORTINGLISTSLICK
      ],
    [UserOps.REPORTINGTV]:
      [
        NavBarConstants.DASHBOARDSLICK,
        NavBarConstants.REPORTINGLISTSLICK
      ],
    [UserOps.REPORTINGPACING]:
      [
        NavBarConstants.DASHBOARDSLICK,
        NavBarConstants.REPORTINGLISTSLICK
      ],
    [UserOps.REPORTINGRECENTREPORT]:
      [
        NavBarConstants.DASHBOARDSLICK,
        NavBarConstants.REPORTINGLISTSLICK
      ],
    [UserOps.REPORTINGEXCEL]:
      [
        NavBarConstants.DASHBOARDSLICK,
        NavBarConstants.REPORTINGLISTSLICK
      ],
    [UserOps.REPORTINGPPT]:
      [
        NavBarConstants.DASHBOARDSLICK,
        NavBarConstants.REPORTINGLISTSLICK
      ],
    [UserOps.REPORTINGDOMO]: [
      NavBarConstants.DASHBOARDSLICK,
      NavBarConstants.REPORTINGLISTSLICK
    ],
    [UserOps.REQUESTER]: [
      NavBarConstants.DASHBOARDSLICK,
      NavBarConstants.REQUESTSLISTSLICK
    ],
    [UserOps.REQUESTMANAGER]: [
      NavBarConstants.DASHBOARDSLICK,
      NavBarConstants.REQUESTSLISTSLICK
    ],
    [UserOps.USER]: [NavBarConstants.DASHBOARDSLICK],
    [UserOps.REPORTINGUSER]: [NavBarConstants.DASHBOARDSLICK],
    [UserOps.DOMOUSER]: [NavBarConstants.DASHBOARDSLICK]
  };
}

export function getRequiredRoleAccess(UserRole: any) {
  // console.log('UserRole===',UserRole);
  const roleBasedMenu = getMenuPerRole();
  let menuPerRole = '';
  let assignedMenus = [];
  if (UserRole && UserRole.hasOwnProperty('roles') && UserRole.roles) {
    UserRole.roles.map((roleItem: any, i: any) => {
  //  ['CRM Uploader', 'Reporting', 'Requests'].map((roleItem: any, i: any) => {

      if (roleItem) {
        const role = roleBasedMenu[roleItem];
        menuPerRole += role.join(',') + ',';
      }
    });
  }
  if (menuPerRole !== '') assignedMenus = getUnique(menuPerRole.split(','));

  return assignedMenus;
}

export function getRoleBasedRouteAccess(UserRole: any) {
  const roleBasedMenu = {
    [UserOps.ADMIN]: [
      '/',
      '/Terminology',
      '/AdminUsersList',
      '/AddUser',
      '/Admin',
      '/AdminAudienceSegment',
      '/AdminAudienceSegmentList',
      "/AdminCRMStatus",
      "/AdminReportingBannerStatus"
    ],
    [UserOps.AUDIENCEBUILDER]: [
      '/',
      '/Audiences',
      '/AudienceSizer',
      '/Terminology',
    ],
    [UserOps.REPORTINGDOMO]: [
      '/Reporting',
      '/Terminology',
    ],
    [UserOps.DOMOUSER]: [
      '/Reporting',
      '/Terminology',
    ],
    [UserOps.REPORTINGUSER]: [
      '/',
      '/Reporting',
      '/Reporting/TV',
      '/Reporting/Digital',
      '/Terminology',
    ],
    [UserOps.REPORTINGDIGITAL]: [
      '/',
      '/Reporting',
      '/Reporting/Digital',
      '/Terminology',
    ],
    [UserOps.REPORTINGTV]: [
      '/',
      '/Reporting',
      '/Reporting/TV',
      '/Terminology',
    ],
    [UserOps.REPORTINGPACING]: [
      '/',
      '/Reporting',
      '/Reporting/Digital',
      '/Terminology',
    ],
    [UserOps.REPORTINGRECENTREPORT]: [
      '/',
      '/Reporting',
      '/Reporting/Digital',
      '/Terminology',
    ],
    [UserOps.REPORTINGEXCEL]: [
      '/',
      '/Reporting',
      '/Reporting/Digital',
      '/Reporting/Digital/Excel/',
      '/Reporting/Digital/Excel/:orderId',
      '/Terminology',
    ],
    [UserOps.REPORTINGPPT]: [
      '/',
      '/Reporting',
      '/Reporting/Digital',
      '/Reporting/Digital/PowerPoint',
      '/Reporting/Digital/PowerPoint/:orderId',
      '/Terminology',
    ],
    [UserOps.CAMPAIGNREQ]: [
      '/CampaignStatus:campaignId',
      '/Audiences',
      '/AudienceSizer',
      '/Insights',
      '/Campaign',
      '/Planning',
      '/Terminology',
      '/CampaignConfirmation'
    ],
    [UserOps.BETATESTER]: [
      '/',
      '/Terminology',
    ],
    [UserOps.ADOPS]: [
      '/CampaignStatus:campaignId',
      '/Terminology',
    ],
    [UserOps.CRMUPLOADER]: ['/CRMUploader', '/Terminology'],
    [UserOps.REQUESTER]: [
      '/',
      '/Requests',
      'RequestsReport',
      '/Terminology',
    ],
    [UserOps.REQUESTMANAGER]: [
      '/',
      '/Requests',
      '/RequestsReport',
      '/Terminology',
    ],
    [UserOps.USER]: ['/', '/Terminology']
  };
  let menuPerRole = '';
  let assignedMenus = [];
  if (UserRole && UserRole.hasOwnProperty('roles') && UserRole.roles) {
    UserRole.roles.map((roleItem: any, i: any) => {
      console.log('if (roleItem)===',roleItem);
      if (roleItem) {
        
        let role = roleBasedMenu[roleItem];
        menuPerRole += role.join(',') + ',';
      }
      console.log('menuPerRole===',menuPerRole);
    });
  }
  if (menuPerRole !== '') assignedMenus = getUnique(menuPerRole.split(','));
  console.log('assignedMenus===',assignedMenus);

  return assignedMenus;
}
