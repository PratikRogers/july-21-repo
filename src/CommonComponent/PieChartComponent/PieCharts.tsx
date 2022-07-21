/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
var PieChart = require("react-chartjs").Pie;

 class PieCharts extends React.Component<IPieCharts, {}> {

    public state:any;
    constructor(props: any) {
        super(props);
    }
   
    render() {
        let malePercent = this.props.chartData.Male;
        let femalePercent = this.props.chartData.Female;
        if(malePercent <=0 && femalePercent <=0) {
            return null;
        }
        if(this.props.UIConfStats.isSpinnerActive){
            malePercent=0;
            femalePercent=0;
        }
       
        let data = [
            {
                value: malePercent,
                color:"#00a0b7",
                highlight: "#00a0b7",
                label: "Male"
            },
            {
                value: femalePercent,
                color: "#ffbf3f",
                highlight: "#ffbf3f",
                label: "Female"
            },
           
        ];
        let chartOptions = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
        
            //String - The colour of each segment stroke
            segmentStrokeColor : "#fff",
        
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
        
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
        
            //Number - Amount of animation steps
            animationSteps : 100,
        
            //String - Animation easing effect
            animationEasing : "easeOutBounce",
        
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
        
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            
        }
        return(
            <PieChart data={data} options={chartOptions}  width="200" height="200"/>
        )

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

})(PieCharts);

interface IPieCharts extends React.FC<any> {
    UIConfStats:any;
    chartData:any;
    history: any;
}
