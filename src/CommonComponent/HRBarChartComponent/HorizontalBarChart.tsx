/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
 
 class HorizontalBarChart extends React.Component<IHorizontalBarChart, {}> {

    public state:any;
    constructor(props: any) {
        super(props);
    }
   
    render() {
        let chartData = this.props.chartData;
        if(chartData.length <=0) return <div/>
        if(this.props.UIConfStats.isSpinnerActive){
            chartData = []
        }
        return <ul className="bar-graph">
        {chartData.map((item: any, i: any) => {
            const stl = {
                width: item.percent +"%"
            };
            return (<li key={item.range+i}>
                    <p>{item.range}</p>
                    <div className="bar-wrap"><span className="bar-fill position-relative" style={{ ...stl }}><span className="txt">{item.percent}%</span></span>
                    </div>
                </li>)
        })}
        </ul>

    }

}

function mapStateToProps(state: any) {
    return {
        UIConfStats: state.SpinnerState.hasOwnProperty("UIConfig") ? state.SpinnerState.UIConfig : { UIConfig: { isSpinnerActive: true } }
   
    };
}


export default connect(mapStateToProps, (dispatch) => {
    return {
     
    }

})(HorizontalBarChart);

interface IHorizontalBarChart extends React.FC<any> {
    UIConfStats:any;
    chartData:any;
    history: any;
}
