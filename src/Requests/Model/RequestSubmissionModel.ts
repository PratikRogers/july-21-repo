/* eslint-disable */
export class RequestSubmissionModel {
    public requestId:any;
    public requestStatus: any;
    public fileDetail:any;
    public formData:any;
    public fileName:any;
    public fileLink:any;
    public redirectUrl:any;
    public comments:any;
    constructor( ) {
        this.requestStatus = "Open";
    }

    public getUpdateRequestPayload(props:any) {
        return {
            id:this.requestId,
            url:this.redirectUrl?this.redirectUrl:props.url,
            managersComment:this.comments?this.comments:props.managersComment,
            status:this.requestStatus,
            uploadedFileName:this.fileName?this.fileName:props.uploadedFileName
        }
    }

    public getSubmitPayload() {
        let data = null;
        if(this.formData) {
            data = new FormData();
            data.append("file",this.formData);
        }
          return data;
    }

    buildRequestModel(prop:any) {
        // console.log("Go with is",prop);
        this.requestId = prop.id;
        this.requestStatus =prop.status;
        this.redirectUrl = prop.url;
        this.comments = prop.managersComment;
        this.fileName = prop.uploadedFileName;
    }
}

export default RequestSubmissionModel;