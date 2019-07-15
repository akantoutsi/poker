import * as actionTypes from '../actionTypes';

const initialState = {
    cards: []              
};

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_BOARD_CARDS:
            return {
                ...state,
                cards: state.cards.concat(action.payload)
                // round: 1
            }
    }

    return state;
}

export default boardReducer;

