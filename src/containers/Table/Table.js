import React, { Component } from 'react';
import { connect }          from 'react-redux'; 
import _                    from 'lodash';
import Board                from '../Board/Board';
import Players              from '../Players/Players';
import * as actionTypes     from '../../store/actionTypes';
  
import './Table.css';

class Table extends Component {

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

    sortArray = (arr, property) => {
        const res = arr.sort((a, b) => a.rank < b.rank ? 1 : -1);
      
        return res;
    }

    formatCards = (cardsToFormat) => {
        let cards                  = this.sortArray(cardsToFormat, 'rank');  
        let grpCardsBySuit         = this.groupByProperty(cards, 'suit');
        let tmpGroupedCardsByValue = this.groupByProperty(cards, 'rank');

        for (let elem in tmpGroupedCardsByValue) { 
            tmpGroupedCardsByValue[elem].freq = tmpGroupedCardsByValue[elem].length; 
        }

        let grpCardsByValue = Object.entries(tmpGroupedCardsByValue);
        this.sortArray(grpCardsByValue, grpCardsByValue[1]);

        this.props.getWinner(grpCardsBySuit, grpCardsByValue);
    }

    printWinners = (arr) => {
        let q = arr.map(elem => {
            return elem.reduce((acc, el) => {
                const key = el.typeOfCombination;
            
                if (!acc[key]) {
                    acc[key] = [];
                }
        
                acc[key].push(el);
        
                return acc;
            }, {});
        });
          
        let d = q.map(elem => Object.entries(elem));
        d.map(elem => elem[0][0] = parseInt(elem[0][0]));
        
        let res  = d.reduce((acc, el) => { acc[0] = (acc[0] === undefined || el[0][0] < acc[0]) ? el[0][0] : acc[0]; return acc; }, []);
        let afro = d.filter(elem => elem[0].includes(res[0]));
        let nana = afro.map(elem => elem[0][1]);

        return nana;
    }

    getWinnerIds = (arr) => {
        return arr.map(elem => {
            return elem[0].reduce((acc, el) => { 
                acc = (el.belongsTo !== 'board') ? parseInt(el.belongsTo) : 'board';  
                return acc; 
            }, -1);
        });
    }     

    render() {
        let result      = [];
        let winnerIds   = [];
        let winnerCards = [];

        if (this.props.plr.openBoardCards) {
            console.log('open next card');
            this.props.updatePotsNumber();
            this.props.openAllBoardCards(0);
            
            if (this.props.plr.potsCount >= 5) {
                this.props.areAllBoardCardsOpen();
            }

            this.props.resetOpenCardsFlags();
        }

        if (this.props.plr.openAllBoardCards) {
            console.log('open all cards');
            this.props.updatePotsNumber();
            this.props.openAllBoardCards(1);
            this.props.areAllBoardCardsOpen();
            this.props.resetOpenCardsFlags();
        }

        if (this.props.plr.potsCount >= 5) {
            console.log('check for winner no matter what');
            this.props.resetPotsNumber();
            this.props.openAllBoardCards(1);
            this.props.areAllBoardCardsOpen();
            this.props.resetOpenCardsFlags();
            this.props.setNoneAsNextPlayer();
        }

        if (this.props.brd.checkForWinner) {
            alert('all cards open - check for winner');
            this.props.resetPotsNumber();
            let updatedBoardCards = this.props.brd.cards.slice();

            let cardsToCheck = this.props.plr.possibleWinners.map(elem => {
                return elem.cards.concat(updatedBoardCards.map(el => ({...el, belongsTo: elem.cards[0].belongsTo, isBoard: true})));
            });

            cardsToCheck.map(el => this.formatCards(el));
        }

        result = this.printWinners(this.props.brd.winCombinations);

        if (result.length >= 1) {
            winnerIds = this.getWinnerIds(result);
            console.log(winnerIds);

            if (result.length > 0) {
                let comb = this.props.tbl.cardCombinations.filter(elem => elem.code === (result[0][0].typeOfCombination));
                alert(`The winning combination is ${_.get(comb[0], 'title')}. Winner(s) are player(s): ${winnerIds.map(elem => elem+1)}`);
                winnerCards = result.map(elem => elem[0].slice(0, elem[0].typeOfCombination));
            }
            
            console.log(winnerCards);

            this.props.resetWinners();
            this.props.resetRound();
        } 

        return (
            <div>
                <div className='window-class'>
                    <div className='Table-Wrapper'>
                        <strong><div className='center'>{`Sum: ${this.props.plr.tablePot}`}</div></strong>
                        
                        <div className='Table'>
                            <Players />
                            <Board />
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tbl: state.table,
        plr: state.players,
        brd: state.board
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openAllBoardCards   : (openAll)                   => dispatch({type: actionTypes.OPEN_CARDS,               payload: openAll}),
        resetOpenCardsFlags : ()                          => dispatch({type: actionTypes.RESET_OPEN_CARDS_FLAGS}),
        areAllBoardCardsOpen: ()                          => dispatch({type: actionTypes.ALL_BOARD_CARDS_OPEN}),
        getWinner           : (cardsBySuit, cardsByValue) => dispatch({type: actionTypes.GET_WINNER,               payload: {cardsBySuit: cardsBySuit, cardsByValue: cardsByValue}}),
        resetWinners        : ()                          => dispatch({type: actionTypes.RESET_WINNERS}),
        resetRound          : ()                          => dispatch({type: actionTypes.RESET_ROUND}),
        updatePotsNumber    : ()                          => dispatch({type: actionTypes.UPDATE_POTS_COUNT}),
        resetPotsNumber     : ()                          => dispatch({type: actionTypes.RESET_POTS_COUNT}),
        setNoneAsNextPlayer : ()                          => dispatch({type: actionTypes.NONE_NEXT_PLAYER})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
