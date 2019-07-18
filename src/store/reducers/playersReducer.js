import * as actionTypes        from '../actionTypes';
import { updateObjectInArray } from '../utils';

const initialState = {
    players: []
};

const playersReducer = (state = initialState, action) => {
    let players;
    let player;

    switch (action.type) {
        case actionTypes.STORE_PLAYERS_CARDS:
            return {
                ...state,
                players: state.players.concat(action.payload)
                // round: 1
            }

        case actionTypes.INCREMENT_PLAYER_POT:
            players = [...state.players];
            player  = players.find(pl => pl.seq === action.payload);

            if ((player.pot + 1) <= (player.maxPot + player.minPot)) {
                player.pot  += 1; 
                player.cash -= 1;

                updateObjectInArray(players, player);
            }

            return {
                ...state.players,
                players
            }

        case actionTypes.DECREMENT_PLAYER_POT:
            players = [...state.players];
            player  = players.find(pl => pl.seq === action.payload);

            if (player.pot - 1 >= 0) {
                player.pot  -= 1; 
                player.cash += 1;

                updateObjectInArray(players, player);
            }

            return {
                ...state.players,
                players
            }
    }

    return state;
}

export default playersReducer;

