export interface IAdminUser {
  email?: any; // Text to be displayed on screen
  company?: any; //Additional desription displayed under dispalyName
  userId?: any; //If gender, age, province, radio, tv etc..
  firstName?: any; //Random count if wish to display
  lastName?: any; //Demograpghics, Interest, Behavior. This would be ENUM
  lastActiveTs?: any;
  roles?: any;
  phone?: any;
  adminUserItem?: any;
  domoDataConstraint?:any;
}
export interface IAdminUserist {
  adminListID?: any;
  adminUserList?: IAdminUser[];
}

export default IAdminUser;
