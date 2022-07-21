export interface IAudienceTrait {
  segmentId?: any; // ID
  segmentName?: any; // dispalyName
  segmentLabel?: any; //description.
  segmentType?: any; //Demograpghics, Interest, Behavior. This would be ENUM
  adobeSegmentId?: any; //Numberic
  legacyId?: any; //Numeric
  inactiveLegacyId?: any; //Numeric
  commissionToUi?: any; // If indexed or not to show on Audience Builder
  recordStatus?: any; //A or D (active or disabled)
  traitType?: any; //Static or Dynamic
  subCategory?: any;
  seqNo?: any;
  prizmId?: any;
  inactiveTvCampaignId?:any;
  templateId?: any;
  showInBuilder?: any;
  // RED- 2615
  exposeToCynch?: any;
  cynchSegmentType?: any;
  agencyDetails?: any;
  universeSize?: any;
  averageTime?:any;

  //RED-2609
  inactiveCrmId?:any;
  startDate?:any;
  endDate?:any;

  inactiveAdobeTraitId?:any;
  showInLinOpts?:any;
}
export interface IAudienceTraitList {
  adminListID?: any;
  adminTraitList?: IAudienceTrait[];
}

export default IAudienceTrait;
