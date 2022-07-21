import { TabType } from "./TabType";

export class DeviceTypeModel {
    public deviceType:any;

    constructor() {
        this.deviceType = TabType.DESKTOP;
    }
    
    public getDeviceType(){
        return this.deviceType;
    }

    public setDeviceType(deviceType:TabType) {
        this.deviceType = deviceType;
    }
}
export default DeviceTypeModel;