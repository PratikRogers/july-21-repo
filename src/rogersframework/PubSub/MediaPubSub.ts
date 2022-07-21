import {Subject} from "rxjs";

export default class MediaPubSub {
    static instance:any;
    private uniPubSub:any;
    constructor(){
      if(MediaPubSub.instance){
        return MediaPubSub.instance;
      }
      MediaPubSub.instance = this;
      this.uniPubSub = new Subject();
    }

    public publishEvent(data:any){
        this.uniPubSub.next(data);
    }

    public getSubObject() {
        return this.uniPubSub.asObservable();
    }
  
  }
  