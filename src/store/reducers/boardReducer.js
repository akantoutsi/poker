import * as actionTypes                                  from '../actionTypes';
import { cardsToOpen, shouldCheckForWinner, findWinner } from '../utils';
import _                                                 from 'lodash';

const initialState = {
    initCards: [
        { suit: 'hearts',  value: 'A'  },
        { suit: 'hearts',  value: 'K'  },
        { suit: 'hearts',  value: 'Q'  },
        { suit: 'hearts',  value: 'J'  },
        { suit: 'hearts',  value: '10' },
        { suit: 'hearts',  value: '9'  },
        { suit: 'hearts',  value: '8'  },
        { suit: 'hearts',  value: '7'  },
        { suit: 'hearts',  value: '6'  },
        { suit: 'hearts',  value: '5'  },
        { suit: 'hearts',  value: '4'  },
        { suit: 'hearts',  value: '3'  },
        { suit: 'hearts',  value: '2'  },
        { suit: 'clubs',   value: 'A'  },
        { suit: 'clubs',   value: 'K'  },
        { suit: 'clubs',   value: 'Q'  },
        { suit: 'clubs',   value: 'J'  },
        { suit: 'clubs',   value: '10' },
        { suit: 'clubs',   value: '9'  },
        { suit: 'clubs',   value: '8'  },
        { suit: 'clubs',   value: '7'  },
        { suit: 'clubs',   value: '6'  },
        { suit: 'clubs',   value: '5'  },
        { suit: 'clubs',   value: '4'  },
        { suit: 'clubs',   value: '3'  },
        { suit: 'clubs',   value: '2'  },
        { suit: 'spades',  value: 'A'  },
        { suit: 'spades',  value: 'K'  },
        { suit: 'spades',  value: 'Q'  },
        { suit: 'spades',  value: 'J'  },
        { suit: 'spades',  value: '10' },
        { suit: 'spades',  value: '9'  },
        { suit: 'spades',  value: '8'  },
        { suit: 'spades',  value: '7'  },
        { suit: 'spades',  value: '6'  },
        { suit: 'spades',  value: '5'  },
        { suit: 'spades',  value: '4'  },
        { suit: 'spades',  value: '3'  },
        { suit: 'spades',  value: '2'  },
        { suit: 'diams',   value: 'A'  },
        { suit: 'diams',   value: 'K'  },
        { suit: 'diams',   value: 'Q'  },
        { suit: 'diams',   value: 'J'  },
        { suit: 'diams',   value: '10' },
        { suit: 'diams',   value: '9'  },
        { suit: 'diams',   value: '8'  },
        { suit: 'diams',   value: '7'  },
        { suit: 'diams',   value: '6'  },
        { suit: 'diams',   value: '5'  },
        { suit: 'diams',   value: '4'  },
        { suit: 'diams',   value: '3'  },
        { suit: 'diams',   value: '2'  }
    ],
    numOfPlayers: actionTypes.NUM_OF_PLAYERS,
    firstPlayerId: null,
    checkForWinner: 0,
    winCombinations: [],
    cards: []
};

const boardReducer = (state = initialState, action) => {
    let cards           = [];
    let updatedCards    = [];
    let checkForWinner  = 0;
    let winCombinations = [];

    switch (action.type) {
        case actionTypes.RESET_WINNERS:
            winCombinations = [];
            
            return {
                ...state,
                winCombinations: winCombinations,
            }

        case actionTypes.RESET_BOARD_CARDS:
            cards = [];
            
            return {
                ...state,
                cards: cards,
            }

        case actionTypes.STORE_BOARD_CARDS:
            return {
                ...state,
                cards: state.cards.concat(action.payload)
            }

        case actionTypes.SET_FIRST_PLAYER:
            return {
                ...state,
                firstPlayerId: action.payload
            }

        case actionTypes.RESET_FIRST_PLAYER:
            return {
                ...state,
                firstPlayerId: null
            }

        case actionTypes.OPEN_CARDS:
            cards        = [...state.cards];
            updatedCards = cardsToOpen(cards, 'isVisible', action.payload);
            
            return {
                ...state,
                cards: updatedCards
            }

        case actionTypes.ALL_BOARD_CARDS_OPEN:
            cards          = [...state.cards];
            checkForWinner = shouldCheckForWinner(cards, 'isVisible') === cards.length;

            return {
                ...state,
                checkForWinner: checkForWinner
            }

        case actionTypes.GET_WINNER:
            winCombinations = [...state.winCombinations];
            checkForWinner  = 0;

            let a = findWinner(action.payload.cardsBySuit, action.payload.cardsByValue);
            winCombinations.push(a);
              
            return {
                ...state,
                checkForWinner: checkForWinner,
                winCombinations: winCombinations
            }
    }
    
    return state;
}

export default boardReducer;

