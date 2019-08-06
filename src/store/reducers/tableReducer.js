import * as actionTypes from '../actionTypes';

const initialState = {
    round: 0,
    dealerId: -1,
    cardCombinations: [
        { code: 1,  title: 'Royal Flush' },
        { code: 2,  title: 'Straight Flush' },
        { code: 3,  title: 'Four of a Kind' },
        { code: 4,  title: 'Full House' },
        { code: 5,  title: 'Flush' },
        { code: 6,  title: 'Straight' },
        { code: 7,  title: 'Three of a Kind' },
        { code: 8,  title: 'Two Pairs' },
        { code: 9,  title: 'Pair' },
        { code: 10, title: 'High Card' },
    ]
};

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_GAME:
            return {
                ...state,
                round: 1
            }

        case actionTypes.RESET_ROUND:
            return {
                ...state,
                round: 0
            }

        case actionTypes.SET_DEALER:
            return {
                ...state,
                dealerId: action.payload
            }
    }

    return state;
}

export default tableReducer;

