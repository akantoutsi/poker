import * as actionTypes        from '../actionTypes';
import { updateObjectInArray } from '../utils';

const initialState = {
    players: []
};

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_PLAYERS_CARDS:
            return {
                ...state,
                players: state.players.concat(action.payload)
                // round: 1
            }

        case actionTypes.STORE_PLAYER_POT:
            const players = [...state.players];
            let   player  = players.find(pl => pl.seq === action.payload.playerId);
            player.pot    = parseInt(action.payload.playerPot);

            updateObjectInArray(players, player);

            return {
                ...state.players,
                players
            }
    }

    return state;
}

export default playersReducer;

