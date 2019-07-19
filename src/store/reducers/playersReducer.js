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

            // if ((player.pot + 1) <= (player.maxPot + player.minPot)) {
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

            console.log(player.potNotLessThan);
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
            
            const updatedPlayers = [];
            
            players.map(pl => {
                pl.potNotLessThan = pl.pot;
                updateObjectInArray(updatedPlayers, pl);
            });

            console.log(updatedPlayers);

            return {
                ...state.players,
                updatedPlayers
            }
    }

    return state;
}

export default playersReducer;

