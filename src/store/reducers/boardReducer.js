// import * as actionTypes                                               from '../actionTypes';
// import { createCards, cardsToOpen, shouldCheckForWinner, findWinner } from '../utils';
// import _                                                              from 'lodash';

// const initialState = {
//     initCards: createCards(),
//     numOfPlayers: actionTypes.NUM_OF_PLAYERS,
//     firstPlayerId: null,
//     checkForWinner: 0,
//     winCombinations: [],
//     cards: []
// };

// const boardReducer = (state = initialState, action) => {
//     let cards           = [];
//     let updatedCards    = [];
//     let checkForWinner  = 0;
//     let winCombinations = [];

//     switch (action.type) {
//         case actionTypes.RESET_WINNERS:
//             winCombinations = [];
//             checkForWinner  = 0;
            
//             return {
//                 ...state,
//                 winCombinations: winCombinations,
//                 checkForWinner: checkForWinner
//             }

//         case actionTypes.RESET_BOARD_CARDS:
//             cards = [];
            
//             return {
//                 ...state,
//                 cards: cards,
//             }

//         case actionTypes.STORE_BOARD_CARDS:
//             return {
//                 ...state,
//                 cards: state.cards.concat(action.payload)
//             }

//         case actionTypes.SET_FIRST_PLAYER:
//             return {
//                 ...state,
//                 firstPlayerId: action.payload
//             }

//         case actionTypes.RESET_FIRST_PLAYER:
//             return {
//                 ...state,
//                 firstPlayerId: null
//             }

//         case actionTypes.OPEN_CARDS:
//             cards        = [...state.cards];
//             updatedCards = cardsToOpen(cards, 'isVisible', action.payload);
            
//             return {
//                 ...state,
//                 cards: updatedCards
//             }

//         case actionTypes.ALL_BOARD_CARDS_OPEN:
//             cards          = [...state.cards];
//             checkForWinner = shouldCheckForWinner(cards, 'isVisible') === cards.length;

//             // if (checkForWinner === true) {
//             //     alert('all cards open - check for winner');
//             //     // this.props.resetPotsNumber();
//             //     let updatedBoardCards = state.cards.slice();
    
//             //     let cardsToCheck = this.props.plr.possibleWinners.map(elem => {
//             //         return elem.cards.concat(updatedBoardCards.map(el => ({...el, belongsTo: elem.cards[0].belongsTo, isBoard: true})));
//             //     });
    
//             //     cardsToCheck.map(el => this.formatCards(el));
//             // }
    
//             // result = this.printWinners(this.props.brd.winCombinations);
    
//             // if (result.length >= 1) {
//             //     // console.log('again')
//             //     winnerIds = this.getWinnerIds(result);
//             //     // console.log(winnerIds);
    
//             //     if (result.length > 0) {
//             //         let comb = this.props.tbl.cardCombinations.filter(elem => elem.code === (result[0][0].typeOfCombination));
//             //         alert(`The winning combination is ${_.get(comb[0], 'title')}. Winner(s) are player(s): ${winnerIds.map(elem => elem+1)}`);
//             //         winnerCards = result.map(elem => elem[0].slice(0, elem[0].typeOfCombination));
//             //     }
                
//             //     // console.log(winnerCards);
    
//             //     updatedWinnerCards = winnerCards.map(elem => elem.map(el => ({...el, selected: true})));
    
//             //     this.props.resetWinners();
//             //     this.props.resetRound();
//             // }     

//             return {
//                 ...state,
//                 checkForWinner: checkForWinner
//             }

//         case actionTypes.GET_WINNER:
//             winCombinations = [...state.winCombinations];
//             checkForWinner  = 0;

//             let a = findWinner(action.payload.cardsBySuit, action.payload.cardsByValue);
//             winCombinations.push(a);
              
//             return {
//                 ...state,
//                 checkForWinner: checkForWinner,
//                 winCombinations: winCombinations
//             }
//     }
    
//     return state;
// }

// export default boardReducer;




// // import * as actionTypes                                               from '../actionTypes';
// // import { createCards, cardsToOpen, shouldCheckForWinner, findWinner } from '../utils';
// // import _                                                              from 'lodash';

// // const initialState = {
// //     initCards: createCards(),
// //     numOfPlayers: actionTypes.NUM_OF_PLAYERS,
// //     firstPlayerId: null,
// //     checkForWinner: 0,
// //     winCombinations: [],
// //     cards: []
// // };

// // const boardReducer = (state = initialState, action) => {
// //     let cards           = [];
// //     let updatedCards    = [];
// //     let checkForWinner  = 0;
// //     let winCombinations = [];

// //     switch (action.type) {
// //         case actionTypes.RESET_WINNERS:
// //             winCombinations = [];
// //             checkForWinner  = 0;
            
// //             return {
// //                 ...state,
// //                 winCombinations: winCombinations,
// //                 checkForWinner: checkForWinner
// //             }

// //         case actionTypes.RESET_BOARD_CARDS:
// //             cards = [];
            
// //             return {
// //                 ...state,
// //                 cards: cards,
// //             }

// //         case actionTypes.STORE_BOARD_CARDS:
// //             return {
// //                 ...state,
// //                 cards: state.cards.concat(action.payload)
// //             }

// //         case actionTypes.SET_FIRST_PLAYER:
// //             return {
// //                 ...state,
// //                 firstPlayerId: action.payload
// //             }

// //         case actionTypes.RESET_FIRST_PLAYER:
// //             return {
// //                 ...state,
// //                 firstPlayerId: null
// //             }

// //         case actionTypes.OPEN_CARDS:
// //             cards        = [...state.cards];
// //             updatedCards = cardsToOpen(cards, 'isVisible', action.payload);
            
// //             return {
// //                 ...state,
// //                 cards: updatedCards
// //             }

// //         case actionTypes.ALL_BOARD_CARDS_OPEN:
// //             cards          = [...state.cards];
// //             checkForWinner = shouldCheckForWinner(cards, 'isVisible') === cards.length;

// //             // if (checkForWinner === true) {
// //             //     alert('all cards open - check for winner');
// //             //     // this.props.resetPotsNumber();
// //             //     let updatedBoardCards = state.cards.slice();
    
// //             //     let cardsToCheck = this.props.plr.possibleWinners.map(elem => {
// //             //         return elem.cards.concat(updatedBoardCards.map(el => ({...el, belongsTo: elem.cards[0].belongsTo, isBoard: true})));
// //             //     });
    
// //             //     cardsToCheck.map(el => this.formatCards(el));
// //             // }
    
// //             // result = this.printWinners(this.props.brd.winCombinations);
    
// //             // if (result.length >= 1) {
// //             //     // console.log('again')
// //             //     winnerIds = this.getWinnerIds(result);
// //             //     // console.log(winnerIds);
    
// //             //     if (result.length > 0) {
// //             //         let comb = this.props.tbl.cardCombinations.filter(elem => elem.code === (result[0][0].typeOfCombination));
// //             //         alert(`The winning combination is ${_.get(comb[0], 'title')}. Winner(s) are player(s): ${winnerIds.map(elem => elem+1)}`);
// //             //         winnerCards = result.map(elem => elem[0].slice(0, elem[0].typeOfCombination));
// //             //     }
                
// //             //     // console.log(winnerCards);
    
// //             //     updatedWinnerCards = winnerCards.map(elem => elem.map(el => ({...el, selected: true})));
    
// //             //     this.props.resetWinners();
// //             //     this.props.resetRound();
// //             // }     

// //             return {
// //                 ...state,
// //                 checkForWinner: checkForWinner
// //             }

// //         case actionTypes.GET_WINNER:
// //             winCombinations = [...state.winCombinations];
// //             checkForWinner  = 0;

// //             let a = findWinner(action.payload.cardsBySuit, action.payload.cardsByValue);
// //             winCombinations.push(a);
              
// //             return {
// //                 ...state,
// //                 checkForWinner: checkForWinner,
// //                 winCombinations: winCombinations
// //             }
// //     }
    
// //     return state;
// // }

// // export default boardReducer;

