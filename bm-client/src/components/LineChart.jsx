import React from 'react';
import {connect} from 'react-redux';
import {lineChart} from '../d3/lineChart';
import {findDOMNode} from 'react-dom';
// const lineChart = require('../d3/lineChart.js');

export class LineChart extends React.Component {
  componentDidMount() {
  }

  componentDidUpdate() {
    const el = findDOMNode(this);
    lineChart.create(el, this.props.data);
    // if (this.props.data.length > 0) {
    // }
  }
  // console.log(lineChart.create);
  // console.log(props.data);
  // lineChart.create(chart, props.data);
  render () {
    // console.log('asd');
    // console.log(this.props.data);
    // const chart = <div></div>;
      // if (props.data.length) {
      //   lineChart.create(chart, props.data);
      // }
    return (
      <div className="Chart"></div>
    );
  }
}

const mapStateToProps = state => ({data: state.data});

export const LineChartContainer = connect(mapStateToProps)(LineChart);
