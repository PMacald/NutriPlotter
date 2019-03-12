import React, {Component} from 'react';
import {Svg} from 'expo';
import * as shape from 'd3-shape';
const d3 = {shape};

export default class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(0);
    }

    createPieArc = (index,startAngle, endAngle) => {

        var arc = d3.shape.arc()
        .innerRadius(0)
        .outerRadius(100)
        .startAngle(startAngle)
        .endAngle(endAngle);



        return arc();
    };


    render() {

        const {
            endAngle,
            color,
            index,
            startAngle,
        } = this.props;

        return (

            <Svg.Path
                onPress={()=>this.props.pressHandler(index)}
                d={this.createPieArc(index,startAngle, endAngle)}
                fill={color}
                cx={12} cy={12}
            />
        )

    }
}
