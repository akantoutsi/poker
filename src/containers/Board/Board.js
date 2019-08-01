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

    render() { 
        const allCards = <div className="card back">*</div>;
        
        let cards = [];
        cards = _.cloneDeep(this.props.brd.initCards);
        cards.map(elem => elem.rank = this.getRank(elem, 'value'));
        cards.map(elem => elem.isVisible = false);
        cards = _.orderBy(cards, ['suit', 'rank'], ['asc', 'desc']);
        this.shuffleCards(cards);

        let player        = [];
        let boardCards    = [];
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
                cards           : cards.slice(i+j, i+j+2).map(elem => ({...elem, belongsTo: i})),
                seq             : i,
                cash            : (smallBlindId === i) ? cash - actionTypes.SMALL_BLIND_AMOUNT : 
                                    (bigBlindId === i) ? cash - actionTypes.SMALL_BLIND_AMOUNT*2 : cash,
                isActive        : 1,
                nextPlayer      : (i === bigBlindId + 1) ? 1 : 0, 
                pot             : 0,
                potNotLessThan  : 0,
                maxPot          : cash,
                changedPot      : 0,
                smallBlindAmount: actionTypes.SMALL_BLIND_AMOUNT,
                isSmallBlind    : smallBlindId === i,
                isBigBlind      : bigBlindId === i,
                previousPot     : (smallBlindId === i) ? actionTypes.SMALL_BLIND_AMOUNT : 
                                    (bigBlindId === i) ? actionTypes.SMALL_BLIND_AMOUNT*2 : 0
            });
            j += 1;
        }

        boardCards = cards.slice(j*2, (j*2)+5).map(elem => ({...elem, belongsTo: 'board'}));
        
        if (this.props.shouldOpenBoardCards) {
            console.log('open next card');
            this.props.openAllBoardCards(0);
            this.props.areAllBoardCardsOpen();
            this.props.resetOpenCardsFlags();
        }

        if (this.props.shouldOpenAllBoardCards) {
            console.log('open all cards');
            this.props.openAllBoardCards(1);
            this.props.areAllBoardCardsOpen();
            this.props.resetOpenCardsFlags();
        }

        let res = [];
        if (this.props.brd.checkForWinner) {
            alert('all cards open - check for winner');

            // console.log(this.props.possibleWinnerCards);

            let cardsToCheck = this.props.possibleWinnerCards.map(elem => elem.cards.concat(this.props.brd.cards));
            // console.log(cardsToCheck)

            // let tmp = [
            //     { suit: 'hearts',   value: '8',  rank: 8  },
            //     { suit: 'diamonds', value: '10', rank: 10 },
            //     { suit: 'hearts',   value: 'A',  rank: 14 },
            //     { suit: 'hearts',   value: '10', rank: 10 },
            //     { suit: 'club',     value: '9',  rank: 9  },
            //     { suit: 'hearts',   value: '5',  rank: 5  },
            //     { suit: 'club',     value: 'J',  rank: 11 },
            //     { suit: 'hearts',   value: '2',  rank: 2  },
            //     { suit: 'club',     value: '5',  rank: 5  }
            // ];

            // let cards                  = this.sortArray(cardsToCheck, 'rank');  
            // let grpCardsBySuit         = this.groupByProperty(cards, 'suit');
            // let tmpGroupedCardsByValue = this.groupByProperty(cards, 'rank');

            // for (let elem in tmpGroupedCardsByValue) { 
            //     tmpGroupedCardsByValue[elem].freq = tmpGroupedCardsByValue[elem].length; 
            // }

            // let grpCardsByValue = Object.entries(tmpGroupedCardsByValue);
            // this.sortArray(grpCardsByValue, grpCardsByValue[1]);

            // this.props.getWinner(grpCardsBySuit, grpCardsByValue);

            cardsToCheck.map(el => this.formatCards(el));
        }

        console.log(this.props.brd.winner);

        return (
            <div className='Board'> 
                {
                    this.props.brd.cards.map((card, index) => {
                        return (
                            <div className="playingCards" key={index}>
                                {   
                                    (!card.isVisible)
                                    ? <div className="card back">*</div>
                                    : <Card value={card.value} suit={card.suit} />
                                }
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
        brd                    : state.board,
        shouldOpenBoardCards   : state.players.openBoardCards,
        shouldOpenAllBoardCards: state.players.openAllBoardCards,
        possibleWinnerCards    : state.players.possibleWinners
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storeBoardCards     : (boardCards)                => dispatch({type: actionTypes.STORE_BOARD_CARDS,        payload: boardCards}),
        storePlayersCards   : (playersCards)              => dispatch({type: actionTypes.STORE_PLAYERS_CARDS,      payload: playersCards}),
        setFirstPlayer      : (firstPlayerId)             => dispatch({type: actionTypes.SET_FIRST_PLAYER,         payload: firstPlayerId}),
        updateCurrentPot    : ()                          => dispatch({type: actionTypes.SET_CURRENT_POT}),
        openAllBoardCards   : (openAll)                   => dispatch({type: actionTypes.OPEN_CARDS,               payload: openAll}),
        resetOpenCardsFlags : ()                          => dispatch({type: actionTypes.RESET_OPEN_CARDS_FLAGS}),
        areAllBoardCardsOpen: ()                          => dispatch({type: actionTypes.ALL_BOARD_CARDS_OPEN}),
        getWinner           : (cardsBySuit, cardsByValue) => dispatch({type: actionTypes.GET_WINNER,               payload: {cardsBySuit: cardsBySuit, cardsByValue: cardsByValue}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);