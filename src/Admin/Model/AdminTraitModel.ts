import { List } from 'immutable';
import { IAudienceTraitList, IAudienceTrait } from './IAudienceTraitModel';
import { getTraitTypeText } from '../utils/dashboardValidation';

export class AdminTraitModel implements IAudienceTraitList {
  adminListID: any;
  adminTraitList: any;
  audienceTraitType: any;
  // private PartTwoSegement:ISegmentListWithORFilter;
  constructor(list: any) {
    this.adminListID = 1234;
    this.adminTraitList = [];
    const contxt = this;
    this.audienceTraitType = ['', 'Demographics', 'Behaviours', 'Interests'];
    if (list.length > 0)
      list.forEach(function(item: any) {
        contxt.setAudienceTraitListItems(item);
      });
  }

  getCustomType(traitType: any) {
    return traitType.toUpperCase() === 'S' ? 'Custom' : 'Adobe';
  }

  public getAudienceTraitListPerRow(audienceRowID: any) {
    return this.adminTraitList[audienceRowID];
  }

  public getAudienceTraitList() {
    return List(this.adminTraitList);
  }

  public getEmptyAudienceTraitItem() {
    return {
      segmentId: '', // ID
      segmentName: '', // dispalyName
      segmentLabel: '', //description.
      segmentType: '', //Demograpghics, Interest, Behavior. This would be ENUM
      adobeSegmentId: '', //Numberic
      legacyId: '', //Numeric,
      inactiveLegacyId: '',
      commissionToUi: '', // If indexed or not to show on Audience Builder
      recordStatus: '', //A or D (active or disabled)
      traitType: 'D', //Static or Dynamic
      subCategory: '',
      seqNo: '',
      prizmId:'',
      templateId:'',
      showInBuilder:'Y',
      // RED- 2615
      exposeToCynch : 'N',
      cynchSegmentType : 'Standard',
      agencyDetails : {agencyType:'All',agencyIds:[0]},
      universeSize: '',
      averageTime: '',

      // RED- 2609
      inactiveCrmId:'',

      // RED - 3245
      inactiveTvCampaignId:'',
      // RED-2827
      startDate:'',
      endDate:'',

      // RED -3386
      inactiveAdobeTraitId:'',

      showInLinOpts:'N'
    };
  }

  public getRecordCountDetails(audienceTraitSize: any) {
    const arrayOfStrings = audienceTraitSize.split(',');
    return arrayOfStrings;
  }

  public getRecordWithSeparator(record: any, separator: any) {
    const arrayOfStrings = record.split(separator);
    return arrayOfStrings;
  }
  public getAudienceTraitListItem(listItem: any) {
    const adminUserItem = <IAudienceTrait>listItem;
    const userItem = this.getEmptyAudienceTraitItem();
    userItem.segmentId = adminUserItem.segmentId;
    userItem.segmentName = adminUserItem.segmentName;
    userItem.segmentLabel = adminUserItem.segmentLabel;
    userItem.segmentType = this.audienceTraitType[
      adminUserItem.segmentType || 0
    ];
    userItem.adobeSegmentId = adminUserItem.adobeSegmentId;
    userItem.legacyId = adminUserItem.legacyId;
    userItem.inactiveLegacyId = adminUserItem.inactiveLegacyId;
    userItem.commissionToUi = adminUserItem.commissionToUi;
    userItem.recordStatus = adminUserItem.recordStatus;
    userItem.subCategory = adminUserItem.subCategory;
    userItem.seqNo = adminUserItem.seqNo;
    userItem.traitType =  getTraitTypeText(adminUserItem.traitType).title ;
    userItem.prizmId = adminUserItem.prizmId;
    userItem.templateId = adminUserItem.templateId;
    userItem.showInBuilder = adminUserItem.showInBuilder

     // RED- 2615
     userItem.exposeToCynch = adminUserItem.exposeToCynch;
     userItem.cynchSegmentType = adminUserItem.cynchSegmentType;
     userItem.agencyDetails = adminUserItem.agencyDetails;
     userItem.universeSize= adminUserItem.universeSize;
     userItem.averageTime= adminUserItem.averageTime;
     userItem.inactiveTvCampaignId = adminUserItem.inactiveTvCampaignId

     // RED- 2609
     userItem.inactiveCrmId  = adminUserItem.inactiveCrmId;
     userItem.startDate = adminUserItem.startDate;
     userItem.endDate = adminUserItem.endDate;

     // RED -3386
     userItem.inactiveAdobeTraitId = adminUserItem.inactiveAdobeTraitId;

     userItem.showInLinOpts = adminUserItem.showInLinOpts;
    
    return userItem;
  }

  public setAudienceTraitListItems(reqObj: any) {
    if (reqObj.recordStatus === 'A') {
      const userItem = this.getAudienceTraitListItem(reqObj);
      this.adminTraitList.push(userItem);
    }
  }

  
}

export default AdminTraitModel;
