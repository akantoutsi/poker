import * as actionTypes        from '../actionTypes';
import { updateObjectInArray } from '../utils';

const initialState = {
    players: []
};

const playersReducer = (state = initialState, action) => {
    let players;
    let restPlayers;
    let player;
    let currentPlayer;

    switch (action.type) {
        case actionTypes.STORE_PLAYERS_CARDS:
            players = action.payload;

            const smallBlindPlayer = players.find(pl => pl.isSmallBlind);
            smallBlindPlayer.pot   = actionTypes.SMALL_BLIND_AMOUNT;

            const bigBlindPlayer = players.find(pl => pl.isBigBlind);
            bigBlindPlayer.pot   = actionTypes.SMALL_BLIND_AMOUNT * 2;

            updateObjectInArray(players, smallBlindPlayer);
            updateObjectInArray(players, bigBlindPlayer);

            return {
                ...state,
                players
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
            players                  = [...state.players];
            currentPlayer            = players.find(pl => pl.seq === action.payload);
            restPlayers              = players.slice(currentPlayer.seq + 1, players.length);
            player                   = restPlayers.find(elem => elem.isActive);
            currentPlayer.nextPlayer = 0;
            currentPlayer.isActive   = 0;

            // edw na tsekarw ean prepei na rixw filla katw - ean to pot olws einai apodekto kai ekleise o kiklos
            if (restPlayers.length > 0) {
                player.nextPlayer = 1;
        
            } else {
                player = players.find(elem => elem.isActive);
                player.nextPlayer = 1;
            }

            updateObjectInArray(players, player);

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
                restPlayers   = players.slice(currentPlayer.seq + 1, players.length);
        
                // edw na tsekarw ean prepei na rixw filla katw - ean to pot olws einai apodekto kai ekleise o kiklos
                if (restPlayers.length > 0) {
                    player                   = restPlayers.find(elem => elem.isActive);
                    player.nextPlayer        = 1;
                    currentPlayer.nextPlayer = 0;
    
                } else {
                    player                   = players.find(elem => elem.isActive);
                    player.nextPlayer        = 1;
                    currentPlayer.nextPlayer = 0;
                }
    
                updateObjectInArray(players, player);

                return {
                    ...state.players,
                    players
                }
    }

    return state;
}

export default playersReducer;

