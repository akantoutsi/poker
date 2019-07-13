import React, { Component } from 'react';
import _                    from 'lodash';

class BestCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tmp: 
            [
                { suit: 'clubs',  value: 'J' },
                { suit: 'diams',  value: 'A' },
                { suit: 'hearts', value: 'Q' },
                { suit: 'spades', value: '5' },
                { suit: 'clubs',  value: 'K' },
                { suit: 'diams',  value: 'A' },
                { suit: 'heart',  value: 'K' },
                { suit: 'spades', value: '6' },
                { suit: 'clubs',  value: 'A' },
                { suit: 'diams',  value: '6' },
                { suit: 'hearts', value: '4' },
                { suit: 'spades', value: '2' },
                { suit: 'clubs',  value: '10'},
                { suit: 'diams',  value: '7' },
                { suit: 'hearts', value: 'A' },
                { suit: 'spades', value: '7' },
                { suit: 'clubs',  value: 'Q' },
                { suit: 'hearts', value: '8' },
                { suit: 'spades', value: 'A' }
            ]
        }
    };
    
    shuffleCards = arr => {
        for (let i = 0; i < arr.length; i++) {
          const rnd = Math.random() * i | 0;
          const tmp = arr[i];
          arr[i]    = arr[rnd];
          arr[rnd]  = tmp;
        }
        return arr;
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