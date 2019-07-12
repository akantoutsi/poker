import React, { Component } from 'react';
import _                    from 'lodash';

class BestCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tmp: 
            [
                { suit: 'club',    value: 'J' },
                { suit: 'diamond', value: 'A' },
                { suit: 'heart',   value: 'Q' },
                { suit: 'spade',   value: '5' },
                { suit: 'club',    value: 'K' },
                { suit: 'diamond', value: 'A' },
                { suit: 'heart',   value: 'K' },
                { suit: 'spade',   value: '6' },
                { suit: 'club',    value: 'A' },
                { suit: 'diamond', value: '6' },
                { suit: 'heart',   value: '4' },
                { suit: 'spade',   value: '2' },
                { suit: 'club',    value: '10'},
                { suit: 'diamond', value: '7' },
                { suit: 'heart',   value: '1' },
                { suit: 'spade',   value: '7' },
                { suit: 'club',    value: 'Q' },
                { suit: 'heart',   value: '8' },
                { suit: 'spade',   value: 'A' }
            ]
        }
    };
    
    getRank = (obj, property) => {
        let rank = 0;
        
        if (obj[property] === 'J') {
            rank = 11;  
        } else if (obj[property] === 'Q') {
            rank = 12;  
        } else if (obj[property] === 'K') {
            rank = 13;  
        } else if (obj[property] === 'A') {
            rank = 14;  
        } else {
            rank = parseInt(obj[property]);
        }
        
        return rank;
    };

    groupByProperty = (ourArray, property) => {
        return ourArray.reduce(function (accumulator, object) {
            const key = object[property];
    
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
    
            accumulator[key].push(object);
    
            return accumulator;
        }, {});
    }

    render() {
        let cards  = [];

        this.state.tmp.map(elem => elem.rank = this.getRank(elem, 'value'));

        _.orderBy([this.state.tmp], ['value'], ['desc']);
        cards = Object.values(this.state.tmp);

        return (
            <div>
                { cards.map(elem => elem.value) }
            </div>
        );

        // delete them
        // let arr = [
        //     ["14", [{suit: "spade", value: "A", rank: 14}], 1],
        //     ["13", [{suit: "club", value: "K", rank: 13}], 2],
        //     ["12", [{suit: "diamond", value: "Q", rank: 12}], 3]
        // ];

        // let copiedArr  = _.cloneDeep(arr);
        // let arrToCheck = [];


        // if (copiedArr.length >= 1) {
        //     copiedArr[1][1].suit = 'afro'; 
        // }

        // return (
        //     <div>
        //         {console.log(arr, copiedArr, arrToCheck)}
        //     </div>
        // );
    }
}

export default BestCard;