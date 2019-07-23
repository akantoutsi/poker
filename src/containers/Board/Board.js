import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Card                 from '../../components/Card/Card';
import _                    from 'lodash';
import * as actionTypes     from '../../store/actionTypes';


import './Board.css';

class Board extends Component {
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
        const allCards = <div className="card back">*</div>;
        
        let cards  = [];
        cards = _.cloneDeep(this.props.brd.initCards);
        cards.map(elem => elem.rank = this.getRank(elem, 'value'));
        cards = _.orderBy(cards, ['suit', 'rank'], ['asc', 'desc']);
        this.shuffleCards(cards);

        let player = [];
        let boardCards  = [];
        let firstPlayerId = null;
        let j = 0;

        for (let i=0; i<actionTypes.NUM_OF_PLAYERS; i++) {
            let smallBlindId  = (actionTypes.DEALER_ID + 1 > actionTypes.NUM_OF_PLAYERS.length) 
                              ?  actionTypes.DEALER_ID - actionTypes.NUM_OF_PLAYERS.length     
                              :  actionTypes.DEALER_ID + 1;

            let bigBlindId    = (actionTypes.DEALER_ID + 2 > actionTypes.NUM_OF_PLAYERS.length) 
                              ?  actionTypes.DEALER_ID - actionTypes.NUM_OF_PLAYERS.length + 1 
                              :  actionTypes.DEALER_ID + 2;

            firstPlayerId     = (bigBlindId + 1 > actionTypes.NUM_OF_PLAYERS.length)
                              ?  bigBlindId - actionTypes.NUM_OF_PLAYERS.length + 1 
                              :  bigBlindId + 1;

            let cash = Math.floor(Math.random() * (10 - actionTypes.SMALL_BLIND_AMOUNT*2)) + (actionTypes.SMALL_BLIND_AMOUNT*2);                    

            player.push({
                cards           : cards.slice(i+j, i+j+2),
                seq             : i,
                cash            : (smallBlindId === i) ? cash - actionTypes.SMALL_BLIND_AMOUNT : 
                                    (bigBlindId === i) ? cash - actionTypes.SMALL_BLIND_AMOUNT*2 : cash,
                isActive        : 1,
                nextPlayer      : (i === bigBlindId + 1) ? 1 : 0, 
                pot             : 0,
                potNotLessThan  : 0,
                maxPot          : cash,
                smallBlindAmount: actionTypes.SMALL_BLIND_AMOUNT,
                isSmallBlind    : smallBlindId === i,
                isBigBlind      : bigBlindId === i,
                previousPot     : (smallBlindId === i) ? actionTypes.SMALL_BLIND_AMOUNT : 
                                    (bigBlindId === i) ? actionTypes.SMALL_BLIND_AMOUNT*2 : 0
            });
            j += 1;
        }

        boardCards = cards.slice(j*2, (j*2)+5);

        return (
            <div className='Board'> 
                {
                    this.props.brd.cards.map((card, index) => {
                        return (
                            <div className="playingCards" key={index}>
                                <div className="card back">*</div>

                                {/* to katotthi prepei na anoigei stadiaka ana sinthikes - pws? 
                                kai antistoixa oi kartes twn paiktwn
                                kai na einai mono tou current anoixtes */}
                                {/* <Card value={card.value} suit={card.suit} /> */}
                            </div>
                        );
                    })
                }

                <div className="playingCards all-cards" 
                    onClick={() => this.props.brd.round === 0 ? (this.props.storeBoardCards(boardCards), 
                                                                 this.props.storePlayersCards(player),
                                                                 this.props.setFirstPlayer(firstPlayerId),
                                                                 this.props.updateCurrentPot()) : null}>
                    
                    {allCards}
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        brd: state.board
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storeBoardCards  : (boardCards)    => dispatch({type: actionTypes.STORE_BOARD_CARDS,   payload: boardCards}),
        storePlayersCards: (playersCards)  => dispatch({type: actionTypes.STORE_PLAYERS_CARDS, payload: playersCards}),
        setFirstPlayer   : (firstPlayerId) => dispatch({type: actionTypes.SET_FIRST_PLAYER,    payload: firstPlayerId}),
        updateCurrentPot : ()              => dispatch({type: actionTypes.SET_CURRENT_POT})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);