import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Board                from '../Board/Board';
import Players              from '../Players/Players';
import _                    from 'lodash';
import * as actionTypes     from '../../store/actionTypes';
  
import './Table.css';

class Table extends Component {

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
        cards = _.cloneDeep(this.props.tbl.initCards);
        cards.map(elem => elem.rank = this.getRank(elem, 'value'));
        cards = _.orderBy(cards, ['suit', 'rank'], ['asc', 'desc']);
        this.shuffleCards(cards);

        let playerCards = [];
        let boardCards  = [];
        let j = 0;

        for (let i=0; i<actionTypes.NUM_OF_PLAYERS; i++) {
            let smallBlindId = (actionTypes.DEALER_ID + 1 > actionTypes.NUM_OF_PLAYERS.length) 
                             ?  actionTypes.DEALER_ID - actionTypes.NUM_OF_PLAYERS.length     
                             :  actionTypes.DEALER_ID + 1;

            let bigBlindId  = (actionTypes.DEALER_ID + 2 > actionTypes.NUM_OF_PLAYERS.length) 
                            ?  actionTypes.DEALER_ID - actionTypes.NUM_OF_PLAYERS.length + 1 
                            :  actionTypes.DEALER_ID + 2;

            playerCards.push({
                cards: cards.slice(i+j, i+j+2),
                seq: i,
                cash: Math.floor(Math.random() * 100) + 1,
                isActive: 1,
                pot: 0,
                smallBlindAmount: actionTypes.SMALL_BLIND_AMOUNT,
                isSmallBlind: smallBlindId === i,
                isBigBlind: bigBlindId === i
            });
            j += 1;
        }

        boardCards = cards.slice(j*2, (j*2)+5);

        // kathe fora pou vgainei nikitis na kanw to round 0 - de xerw pou tha xreiastei afto
        if (this.props.tbl.round === 0) {
            this.props.storeBoardCards(boardCards);
            this.props.storePlayersCards(playerCards);
        }

        return (
            <div className='window-class'>
                {/* <div className='player-info-2'>
                    <div>Player 2</div>
                    <hr />
                    <div>
                        $ 1.200
                        <input type='number' min='0' step='0.1' />
                        <button>Ok</button> 
                    </div>
                </div>

                <div className='player-2'>
                    <div className='center'>Seat Open / Player 2</div>
                </div>

                <div className='player-info-3'>
                    <div>Player 3</div>
                    <hr />
                    <div>
                        $ 1.200
                        <input type='number' min='0' step='0.1' />
                        <button>Ok</button> 
                    </div>
                </div>

                <div className='player-3'>
                    <div className='center'>Seat Open / Player 3</div>
                </div> */}

                <div className='Table'>
                    <Players />
                    <Board />
                </div>

                {/* <div className='player-info-1'>
                    <div>Player 1</div>
                    <hr />
                    <div>
                        $ 1.000
                        <input type='number' min='0' step='0.1' />
                        <button>Ok</button> 
                    </div>
                </div>

                <div className='player-1'>
                    <div className='center'>Seat Open / Player 1</div>
                </div>    

                <div className='player-info-4'>
                    <div>Player 4</div>
                    <hr />
                    <div>
                        $ 800
                        <input type='number' min='0' step='0.1' />
                        <button>Ok</button> 
                    </div>
                </div>

                <div className='player-4'>
                    <div className='center'>Seat Open / Player 4</div>
                </div>*/}
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        tbl: state.table
        // brd: state.board,
        // plr: state.players
    };
}

const mapDispatchToProps = dispatch => {
    return {
        storeBoardCards  : (boardCards)   => dispatch({type: actionTypes.STORE_BOARD_CARDS,   payload: boardCards}),
        storePlayersCards: (playersCards) => dispatch({type: actionTypes.STORE_PLAYERS_CARDS, payload: playersCards})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
