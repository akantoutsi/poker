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

            if ((player.pot + 1) <= (player.maxPot + player.potNotLessThan)) {
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

            if (player.pot - 1 >= player.potNotLessThan) {
                player.pot  -= 1; 
                player.cash += 1;

                updateObjectInArray(players, player);
            }

            return {
                ...state.players,
                players
            }

        case actionTypes.SET_CURRENT_POT:
            players = [...state.players];

            let currentPot = players.reduce((max, elem) => {
                max = (elem.pot > max) ? elem.pot : max;   
                return max;
            }, players[0].pot);
                        
            players.map(pl => {
                pl.potNotLessThan = currentPot;
            });

            return {
                ...state.players,
                players
            }
    }

    return state;
}

export default playersReducer;

