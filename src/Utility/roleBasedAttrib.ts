
import { UserOps } from '../ConstConfig/UserOps';

export function getCRMRoleConfigs() {
  return {
    viewAudience: false,
    viewAudienceDisabled: ' d-none ',
    createNewAudienceDisabled: ' d-none ',
    createNewAudience: false
  };
}

export function getRoleConfigs() {
  return {
    viewAudience: true,
    viewAudienceDisabled: '  ',
    createNewAudienceDisabled: '  ',
    createNewAudience: true
  };
}
export function findMatchingRoles(arr1:any, arr2:any) {
  var ret = [];
  var i;

  for (i in arr1) {
    if (arr2.indexOf(arr1[i]) > -1) {
      ret.push(arr1[i]);
    }
  }
  return ret;
}
export function generateConfiguration(roles:any) {
  const properties = {
    viewAudience: {clsName: ' d-none ', groupsAllowed: [UserOps.AUDIENCEBUILDER], clsEnabled: ''},
    createNewAudience: {clsName: ' d-none ', groupsAllowed: [UserOps.AUDIENCEBUILDER], clsEnabled: ''},
    launchCampaign: {clsName: ' d-none ', groupsAllowed: [UserOps.CAMPAIGNREQ], clsEnabled: ''},
    launchAudience: {clsName: false, groupsAllowed: [UserOps.AUDIENCEBUILDER], clsEnabled: true}
  };

  let newConfig = {};
  var key;

  for (key in properties) {
    if (properties.hasOwnProperty(key)) {
      if (findMatchingRoles(roles, properties[key].groupsAllowed).length >= 1) {
        newConfig[key] = {clsName: properties[key].clsEnabled};
      } else {
        newConfig[key] = {clsName: properties[key].clsName};
      }
    }
  }
  return newConfig;
}

export function getConfig(UserRole: any) {
  if (UserRole && UserRole.hasOwnProperty('roles') && UserRole.roles) {
    // UserRole = UserRole.sort();
    // const index = UserRole.roles.findIndex(
    //   (obj: any) => obj === UserOps.CRMUPLOADER
    // );
    // if (index >= 0 && UserRole.roles.length === 1) {
    //   return getCRMRoleConfigs();
    // }
    return generateConfiguration(UserRole.roles);
  }
  return getRoleConfigs();
}
