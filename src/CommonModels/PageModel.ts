/* eslint-disable */
import { PaginationConst } from "../ConstConfig/PaginationConst";

 
export class PageModel {

    // private pageProps:any;
    public currPage:any;
    public showMaxPage:any;
    public maxPageSize:any;
    public pageStartIndex:any;

    constructor(pageProp:any) {
    //    this.pageProps = pageProp;
       this.currPage = 1;
       this.showMaxPage= -1;
       this.pageStartIndex = 1; 
    //    console.log(this.pageProps)
    }
    setCurrPage(currPage:any) { this.currPage = currPage; }
    getCurrPage() { return this.currPage; } 
    setShowMaxPage(showMaxPage:any) { this.showMaxPage = showMaxPage; } 
    getShowMaxPage ()  { return this.showMaxPage; } 
    setMaxPageSize(maxPageSize:any) { this.maxPageSize = maxPageSize; } 
    getMaxPageSize ()  { return this.maxPageSize; } 
    setPageStartIndex(pageStartIndex:any) { this.pageStartIndex = pageStartIndex; } 
    getPageStartIndex ()  { return this.pageStartIndex; } 

    setModel(payload:any) {
        switch(payload.direction) {
            case PaginationConst.prev:{
                this.currPage -= 1;
            }
            break;
            case PaginationConst.next: {
                this.currPage += 1;
            }
            break;
            case PaginationConst.first:
                this.currPage = 1;
            break;
            case PaginationConst.last:
            {
                this.currPage = payload.pageProps.totalPages;
            }
            break;
            case PaginationConst.pageSwitch: {
                this.currPage = payload.pageNum;
            }
            break;
            default:
            break;
        }
        if(this.currPage >= payload.pageProps.totalPages) {
            this.currPage = payload.pageProps.totalPages;
        }
        if (this.currPage <= 1) {
            this.currPage = 1;
        }

        this.getPaginationMatrices(payload.direction,payload.displayMaxPageList)
    }

    getPaginationModel() {
        return this;
    }

    getPageNumber(direction:any,pageNum:any,pageProps:any) {
        if(direction === PaginationConst.prev) {
             this.currPage -= 1;
        }
        else if (direction === PaginationConst.next) {
            this.currPage += 1;
        }
        else if (direction === PaginationConst.first) {
            this.currPage = 1;
        }
        else if(direction === PaginationConst.last) {
            this.currPage = pageProps.totalPages;
        }
        else if (direction === PaginationConst.pageSwitch) {
            this.currPage = pageNum;
        }
        if(this.currPage >= pageProps.totalPages) {
            this.currPage = pageProps.totalPages;
        }
        if(this.currPage <= 1) {
            this.currPage = 1;
        }
    
        return this;
    }
    
     getPaginationMatrices(direction:any,displayMaxPageList?:any) {
           if(direction === PaginationConst.prev) {
                return this.pagePrev(displayMaxPageList);
           }
           else if (direction === PaginationConst.next) {
                return this.pageNext(displayMaxPageList);
           }
           else if (direction === PaginationConst.first) {
                return this.pagFirst(displayMaxPageList);
           }
           else if(direction === PaginationConst.last) {
                return this.pageLast(displayMaxPageList);
           }
     
    }
    
    pageNext(displayMaxPageList:any) {
        let pageShift = displayMaxPageList-1;
        if(this.showMaxPage <= displayMaxPageList && this.currPage < displayMaxPageList) {
    
        }
       else {
        this.showMaxPage += 1;
           if(this.showMaxPage >= this.maxPageSize) {
            this.showMaxPage =  this.maxPageSize;
           }
           this.pageStartIndex = this.showMaxPage  - pageShift;
    
       }
    //    return pagination;
    }
    
    pagePrev(displayMaxPageList:any) {
        let pageShift = displayMaxPageList-1;
    
        if(this.showMaxPage <= displayMaxPageList && this.currPage < displayMaxPageList) {
        }
       else {
        this.showMaxPage -= 1;
           
        this.pageStartIndex = this.showMaxPage  - pageShift;
    
       }
    //    return pagination;
    }
    
    pageLast(displayMaxPageList:any) {
        let pageShift = displayMaxPageList;
    
        if(this.maxPageSize <= displayMaxPageList) {
            this.showMaxPage =  this.maxPageSize;
        }
       else {
        this.showMaxPage =  this.maxPageSize;
        this.pageStartIndex = this.showMaxPage  - pageShift;
         
       }
    //    return pagination;
    }
    
    pagFirst(displayMaxPageList:any) {
        let pageShift = displayMaxPageList;
    
        if(this.maxPageSize <= displayMaxPageList) {
            this.showMaxPage =  this.maxPageSize;
        }
       else {
        this.showMaxPage =  pageShift;
        this.pageStartIndex = 1;
       }
    }
}

export default PageModel;