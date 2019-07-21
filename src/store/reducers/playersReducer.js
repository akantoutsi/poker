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
    let playerId;

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

            if (player.cash > 0 && player.pot >= player.potNotLessThan && player.pot + 1 <= player.maxPot + player.previousPot) {
                player.pot  += 1; 
                player.cash -= 1;
            }

            if (player.cash > 0 && player.pot <= player.potNotLessThan) {
                if (player.cash >= player.potNotLessThan) {
                    player.pot  = player.potNotLessThan;
                    player.cash = player.cash - (player.potNotLessThan - player.previousPot);

                } else {
                    if (Math.abs(player.potNotLessThan - player.pot) <= player.cash) {
                        player.pot   = player.potNotLessThan;
                        player.cash -= Math.abs(player.potNotLessThan - player.previousPot); 
                    
                    } else {
                        player.pot  = player.pot + player.cash;
                        player.cash = 0;
                    }
                }
            }

            player.previousPot = player.pot;
            player.maxPot      = player.cash;

            updateObjectInArray(players, player);

            return {
                ...state.players,
                players
            }

        case actionTypes.DECREMENT_PLAYER_POT:
            players = [...state.players];
            player  = players.find(pl => pl.seq === action.payload);

            if (player.pot > player.potNotLessThan) {
                if (player.pot - 1 >= player.potNotLessThan) {
                    player.pot  -= 1; 
                    player.cash += 1;

                    if (player.pot >= player.potNotLessThan || player.cash === 0) {
                        updateObjectInArray(players, player);
                    }
                }
            }

            return {
                ...state.players,
                players
            }

        case actionTypes.EXIT_GAME:
            players                  = [...state.players];
            currentPlayer            = players.find(pl => pl.seq === action.payload);
            restPlayers              = players.filter(elem => elem.isActive);
            player                   = restPlayers.find(elem => elem.isActive);
            currentPlayer.nextPlayer = 0;
            currentPlayer.isActive   = 0;

            // edw na tsekarw ean prepei na rixw filla katw - ean to pot olws einai apodekto kai ekleise o kiklos
            playerId = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;

            if (restPlayers.length > 1) {
                player = restPlayers[playerId];
                player.nextPlayer = 1;
        
            } else {
                alert('only one left');
                player            = restPlayers[0];
                player.nextPlayer = 1;
            }

            updateObjectInArray(players, player);

            return {
                ...state.players,
                players
            }

        case actionTypes.UPDATE_PLAYER_POT:            
            players = [...state.players];
            player  = players.find(pl => pl.seq === action.payload.playerId);

            if (player.pot >= player.potNotLessThan || player.cash === 0) {
                player.previousPot = player.pot;
                player.maxPot      = player.cash;

                updateObjectInArray(players, player);
            
            } else {
                if (player.cash > 0 && player.pot <= player.potNotLessThan) {
                    if (player.cash >= player.potNotLessThan) {
                        player.pot  = player.potNotLessThan;
                        player.cash = player.cash - (player.potNotLessThan - player.previousPot);

                    } else {
                        if (Math.abs(player.potNotLessThan - player.pot) <= player.cash) {
                            player.pot   = player.potNotLessThan;
                            player.cash -= Math.abs(player.potNotLessThan - player.previousPot); 
                        
                        } else {
                            player.pot  = player.pot + player.cash;
                            player.cash = 0;
                        }
                    }
                }

                player.previousPot = player.pot;
                player.maxPot      = player.cash;

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
            }, 0);
                        
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
                // restPlayers   = players.slice(currentPlayer.seq + 1, players.length);

                restPlayers   = players.filter(elem => elem.isActive);
        
                if (restPlayers.length > 1) {
                    // console.log(playerId, restPlayers[playerId]);
                    // playerId                 = (currentPlayer.seq < restPlayers.length - 1) ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                    playerId                 = (currentPlayer.seq < players.length - 1) ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                    player                   = restPlayers[playerId];
                    player.nextPlayer        = 1;
                    currentPlayer.nextPlayer = 0;
                
                } else {
                    alert('only one left aaaaa');
                    player            = restPlayers[0];
                    player.nextPlayer = 1;
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

