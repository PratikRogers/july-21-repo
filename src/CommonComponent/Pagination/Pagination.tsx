/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { PaginationConst } from '../../ConstConfig/PaginationConst';
class Pagination extends React.Component<IPagination, {}> {

    public state:any;
    constructor(props: any) {
        super(props);
    }
   
    render() {
        const pageList = [];
        this.props.pageObject.showMaxPage = (this.props.paginationProps.totalPages < 11) ? this.props.paginationProps.totalPages : ((this.props.pageObject.showMaxPage > -1) ? this.props.pageObject.showMaxPage : 11);
        this.props.pageObject.maxPageSize = this.props.paginationProps.totalPages;
        let i = 1;
        const contxt = this;
        function changePageTo(changePage: any, direction: any, pageNum: any, e: any) {
            contxt.props.pageObject.setModel({direction:direction,pageProps:contxt.props.paginationProps,displayMaxPageList:11,pageNum:pageNum})
           
            contxt.props.paginationProps.changePage(contxt.props.pageObject.currPage);
            contxt.props.updatePaginationModel(contxt.props.pageObject);
            
        }
        if(this.props.userOps && this.props.userOps.currPage >=2 && this.props.paginationProps.components.pageList.props.children.length > this.props.userOps.currPage) {
            this.props.paginationProps.changePage(this.props.userOps.currPage);
            this.props.pageObject.setCurrPage(this.props.userOps.currPage);
        }
        for (i = this.props.pageObject.pageStartIndex; i <= this.props.pageObject.showMaxPage; i++) {
            pageList.push({ pageNum: i, classLabel: (this.props.pageObject.currPage === i) ? "selected" : "" })
        }
        
        if (this.props.paginationProps && this.props.paginationProps.components.pageList && this.props.paginationProps.components.pageList.props.children.length > 1)
            return (
                <div className="col-12 customLFPad pl-15 pr-15">
                    <div className="paginationTable spacerV72">
                        <ul>
                            <li onClick={changePageTo.bind(this, this.props.paginationProps.changePage, PaginationConst.first, null)}><span className="paginationFirst float-left" />First</li>
                            <li onClick={changePageTo.bind(this, this.props.paginationProps.changePage, PaginationConst.prev, null)}> <span className="paginationPrev float-left" /></li>
                            {pageList.map((cell: any, i: any) => {
                                return (<li key={"key" + i} className={cell.classLabel + " pageNum "} onClick={changePageTo.bind(this, this.props.paginationProps.changePage, PaginationConst.pageSwitch, cell.pageNum)} >{cell.pageNum}</li>)
                            })}

                            <li onClick={changePageTo.bind(this, this.props.paginationProps.changePage, PaginationConst.next, null)}><span className="paginationNext float-right" /></li>
                            <li onClick={changePageTo.bind(this, this.props.paginationProps.changePage, PaginationConst.last, null)}><span className="paginationLast float-right" />Last</li>
                        </ul>
                    </div>
                    <div className="hSpacer20" />
                    <div className="hSpacer20" />
                </div>
            );
        else if (this.props.paginationProps.totalPages <= 1) {
        }
        
        return <span />;
    }

}

function mapStateToProps(state: any) {
    return {
       
    };
}


export default connect(mapStateToProps, (dispatch) => {
    return {
     
    }

})(Pagination);

interface IPagination extends React.FC<any> {
    loggingIn?: any;
    errorMessage?: any;
    paginationProps?: any;
    pageObject?:any;
    updatePaginationModel?:any
    userOps?:any;
    tableProps?:any;
    history?: any;
}
