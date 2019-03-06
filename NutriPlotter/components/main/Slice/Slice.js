import React, {Component} from 'react';
import Svg, {Path} from 'react-native-svg';
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
    pressHandle(pressIt){
        if (pressIt == true){
            console.log("press handler on!");
        }
    }

    render() {

        const {
            endAngle,
            color,
            index,
            startAngle,
            pressIt
        } = this.props;

        return (
               
            <Path
                onPress={()=>this.pressHandle(pressIt)}
                d={this.createPieArc(index,startAngle, endAngle)}
                fill={color}
                cx={12} cy={12}
            />
        )

    }
}