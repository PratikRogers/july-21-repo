import { isValidEmailAddress } from '../utils/dashboardValidation';

export class UserModel {
  private userId: any;
  private userEmail: any;
  private firstName: any;
  private lastName: any;
  private lastActiveTs: any;
  private Roles: any[];
  private company: any;
  private phone:string;
  private domoDataConstraint:string;

  constructor(userentry: any) {
    this.userId = '';
    this.userEmail = '';
    this.firstName = '';
    this.lastName = '';
    this.Roles = [];
    this.company = '';
    this.lastActiveTs = '';
    this.phone = '';
    this.domoDataConstraint = '';
    if (userentry) {
      this.userId = userentry.userId;
      this.userEmail = userentry.email;
      this.firstName = userentry.firstName;
      this.lastName = userentry.lastName;
      this.Roles = userentry.roles;
      this.company = userentry.company;
      this.lastActiveTs = userentry.lastActiveTs;
      this.phone = userentry.phone
      this.domoDataConstraint = userentry.domoDataConstraint;
    }
  }

  public getEmailAddress() {
    return this.userEmail;
  }
  public setEmailAddress(addr: any) {
    this.userEmail = '';
    this.userEmail = addr;
  }

  public getFirstName() {
    return this.firstName;
  }
  public setFirstName(str: any) {
    this.firstName = str;
  }

  public getLastName() {
    return this.lastName;
  }
  public setLastName(str: any) {
    this.lastName = str;
  }

  public getUserId() {
    return this.userId;
  }
  public setUserId(str: any) {
    this.userId = str;
  }

  public getRoles() {
    return this.Roles;
  }
  public setRoles(str: any) {
    this.Roles = str;
    console.log("Setting Roles",this.Roles);
  }
  public getCompany() {
    return this.company;
  }
  public setCompany(str: any) {
    this.company = str;
  }

  public getLastActiveTS() {
    return this.lastActiveTs;
  }
  public setLastActiveTS(str: any) {
    this.lastActiveTs = str;
  }

  public getPhone() {
    return this.phone;
  }
  public setPhone(userPhone:string) {
    this.phone = userPhone;
  }

  public getDomoDataConstraint() {
    return this.domoDataConstraint;
  }
  public setDomoDataConstraint(domoConstraint:string) {
    this.domoDataConstraint = domoConstraint;
  }

  public findIndex(arrObj: any, id: any) {
    return arrObj.findIndex((obj: any) => obj == id);
  }

  public getUserTemplate() {
    if (((/Rogers\s*$/.test(this.company)))) {
      this.phone = "";
    }
    return {
      userId: this.getUserId(),
      email: this.getEmailAddress(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      roles: this.Roles,
      company: this.getCompany(),
      phone: this.getPhone(),
      domoDataConstraint:this.getDomoDataConstraint()
    };
  }

  public isObjectReady() {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (
      this.userEmail !== '' &&
      this.firstName !== '' &&
      this.lastName !== '' &&
      this.Roles.length > 0 &&
      this.company !== ''
    ) {
      if (!isValidEmailAddress(this.userEmail)) {
        return false;
      }
      if (!(/Rogers\s*$/.test(this.company))) {
        if (this.getPhone() == null || this.getPhone() == "") 
        return false;
        else if((this.getPhone().length<10) || (!regex.test(this.getPhone()))) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  public setSelectedRoles(selectedRoles:any) {
    const roles = selectedRoles.filter(function (e:any) {
      return e.isSelected == true;
  });
    this.setRoles(roles.map(function(role:any){ return role.displayName }));
  }
}

export default UserModel;
