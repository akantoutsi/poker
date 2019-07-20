import * as actionTypes        from '../actionTypes';
import { updateObjectInArray } from '../utils';

const initialState = {
    players: []
};

const playersReducer = (state = initialState, action) => {
    let players;
    let otherPlayers;
    let player;
    let currentPlayer;

    switch (action.type) {
        case actionTypes.STORE_PLAYERS_CARDS:
            return {
                ...state,
                players: state.players.concat(action.payload)
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
        
        case actionTypes.EXIT_GAME:
            players       = [...state.players];
            currentPlayer = players.find(pl => pl.seq === action.payload);
            otherPlayers  = players.slice(currentPlayer.seq + 1, players.length);
            player        = otherPlayers.find(elem => elem.isActive);
            
            // edw na tsekarw ean prepei na rixw filla kate - ean to pot olws einai apodekto kai ekleise o kiklos
            if (player) {
                player.nextPlayer        = 1;
                currentPlayer.nextPlayer = 0;
                currentPlayer.isActive   = 0;
    
                updateObjectInArray(players, player);
            }

            return {
                ...state.players,
                players
            }

        case actionTypes.SET_CURRENT_POT:
            players = [...state.players];

            const currentPot = players.reduce((max, elem) => {
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

        case actionTypes.SET_NEXT_PLAYER:
            players       = [...state.players];
            currentPlayer = players.find(pl => pl.seq === action.payload);
            otherPlayers  = players.slice(currentPlayer.seq + 1, players.length);
            player        = otherPlayers.find(elem => elem.isActive);

            // edw na tsekarw ean prepei na rixw filla kate - ean to pot olws einai apodekto kai ekleise o kiklos
            if (player) {
                player.nextPlayer        = 1;
                currentPlayer.nextPlayer = 0;

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

