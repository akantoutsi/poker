import * as actionTypes from '../actionTypes';

const initialState = {
    round: 0,
    dealerId: -1
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

