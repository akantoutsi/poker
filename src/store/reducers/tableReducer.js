import * as actionTypes from '../actionTypes';

const initialState = {
    round: 0
};

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_GAME:
            return {
                ...state,
                round: 1
            }

        case actionTypes.RESET_ROUND:
            console.log('reseting round')
            return {
                ...state,
                round: 0
            }
    }

    return state;
}

export default tableReducer;

