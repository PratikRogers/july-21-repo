export interface IAudience{
    audienceSizingId?:any;     //ID in table or server maintained unique id
    templateName?:any; // Text to be displayed on screen
    audienceSize?:any; //Additional desription displayed under dispalyName
    userId?:any; //If gender, age, province, radio, tv etc..
    updateTs?:any; //Random count if wish to display
    creationTs?:any //Demograpghics, Interest, Behavior. This would be ENUM
    filterCriteria?:any;
    rowIndex?:any;
}
export interface IAudienceList {
    audienceListID?:any;
    audienceList?:IAudience[];
}

export default IAudience;