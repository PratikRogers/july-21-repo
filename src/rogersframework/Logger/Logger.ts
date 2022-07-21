/* eslint-disable */
import { LOGLEVEL } from "../../ConstConfig/logLevelConst";

export default class Logger {
    static instance:any;
    static logLevel:any;

    constructor(){
      if(Logger.instance){
        return Logger.instance;
      }
      Logger.instance = this;
    }

     static setLogLevel(level:any){
        this.logLevel = level;
    }
     static getInstance() {
        if(!Logger.instance){
        Logger.instance = this;
        }
        return Logger.instance;
    }
     static printLogs() {
        if(this.logLevel === LOGLEVEL.INFO)
            console.log(arguments);
    }
     static printDebugLogs() {
        if(this.logLevel === LOGLEVEL.DEBUG)
            console.debug(arguments);
    }
     static printWarnLogs() {
        if(this.logLevel === LOGLEVEL.WARN)
            console.warn(arguments);
    }

    // Logger.getInstance().printDebugLogs
  
  }
