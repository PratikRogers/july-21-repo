/* eslint-disable */
import { IAdminUserist, IAdminUser } from './IAdminUser';
import { List } from 'immutable';

export class AdminModel implements IAdminUserist {
  adminListID: any;
  adminUserList: any;
  // private PartTwoSegement:ISegmentListWithORFilter;
  constructor(list: any) {
    this.adminListID = 1234;
    this.adminUserList = [];
    const contxt = this;
    if (list.length > 0)
      list.forEach(function(item: any) {
        contxt.setAdminUserListItems(item);
      });
  }

  public getAdminUserListPerRow(audienceRowID: any) {
    return this.adminUserList[audienceRowID];
  }

  public getAdminUserList() {
    return List(this.adminUserList);
  }

  public getEmptyAdminUserItem() {
    return {
      email: '',
      company: '',
      userId: '',
      firstName: '',
      lastName: '',
      lastActiveTs: '',
      roles: [{}],
      phone:'',
      domoDataConstraint:''
    };
  }

  public getRecordCountDetails(audienceSize: any) {
    const arrayOfStrings = audienceSize.split(',');
    return arrayOfStrings;
  }

  public getRecordWithSeparator(record: any, separator: any) {
    const arrayOfStrings = record.split(separator);
    return arrayOfStrings;
  }
  public getAdminUserListItem(listItem: any) {
    const adminUserItem = <IAdminUser>listItem;
    const userItem = this.getEmptyAdminUserItem();
    userItem.email = adminUserItem.email;
    userItem.company = adminUserItem.company;
    userItem.userId = adminUserItem.userId;
    userItem.lastActiveTs = adminUserItem.lastActiveTs;
    userItem.firstName = adminUserItem.firstName;
    userItem.lastName = adminUserItem.lastName;
    userItem.roles = adminUserItem.roles;
    userItem.phone = adminUserItem.phone;
    userItem.domoDataConstraint = adminUserItem.domoDataConstraint;
    return userItem;
  }

  public setAdminUserListItems(reqObj: any) {
    const userItem = this.getAdminUserListItem(reqObj);
    this.adminUserList.push(userItem);
  }
}

export default AdminModel;
