import * as actionTypes        from '../actionTypes';
import { updateObjectInArray } from '../utils';

const initialState = {
    canUpdateTablePot: 1,
    players: []
};

const playersReducer = (state = initialState, action) => {
    let players;
    let restPlayers;
    let player;
    let currentPlayer;
    let playerId;
    let canUpdateTablePot;
    let changedPot = 0;

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
            console.log('a');

            if (player.cash > 0 && player.pot >= player.potNotLessThan && player.pot + 1 <= player.maxPot + player.previousPot) {
                console.log('b');
                player.pot       += 1; 
                player.cash      -= 1;
                player.changedPot = 1;
            }

            if (player.cash > 0 && player.pot <= player.potNotLessThan) {
                console.log('c');
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
            canUpdateTablePot  = state.canUpdateTablePot; 
            canUpdateTablePot  = 1; 
            player.changedPot  = 1;

            updateObjectInArray(players, player);

            return {
                ...state.players,
                players,
                ...state.canUpdateTablePot, 
                canUpdateTablePot
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

                        canUpdateTablePot = state.canUpdateTablePot;
                        canUpdateTablePot = 1; 
                        player.changedPot = 1;

                    } else {
                        canUpdateTablePot = 0; 
                        player.changedPot = 0;
                    }
                }
            }

            return {
                ...state.players,
                players,
                ...state.canUpdateTablePot,
                canUpdateTablePot
            }

        case actionTypes.EXIT_GAME:
            players                  = [...state.players];
            currentPlayer            = players.find(pl => pl.seq === action.payload);
            restPlayers              = players.filter(elem => elem.isActive);
            player                   = restPlayers.find(elem => elem.isActive);
            currentPlayer.nextPlayer = 0;
            currentPlayer.isActive   = 0;

            // edw na tsekarw ean prepei na rixw filla katw - ean to pot olws einai apodekto kai ekleise o kiklos
            if (restPlayers.length >= 2) {
                playerId          = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                player            = restPlayers[playerId];
                player.nextPlayer = 1;

                player.changedPot  = 0;
                
                updateObjectInArray(players, player);

                canUpdateTablePot = state.canUpdateTablePot; 
                canUpdateTablePot = 0; 
            } 

            if (restPlayers.length === 2) {
                alert('only one left');
            }

            return {
                ...state.players,
                players,
                ...state.canUpdateTablePot,
                canUpdateTablePot
            }

        // nomizw pws de xreiazetai
        // case actionTypes.UPDATE_PLAYER_POT:   
        //     players = [...state.players];
        //     player  = players.find(pl => pl.seq === action.payload.playerId);

        //     if (player.pot >= player.potNotLessThan || player.cash === 0) {
        //         player.previousPot = player.pot;
        //         player.maxPot      = player.cash;

        //         updateObjectInArray(players, player);

        //         canUpdateTablePot = state.canUpdateTablePot; 
        //         canUpdateTablePot = 1;
        //         // player.changedPot = 1;

        //         return {
        //             ...state.players,
        //             players,
        //             ...state.canUpdateTablePot,
        //             canUpdateTablePot
        //         }
        //     } 

            // else {
            //     if (player.cash > 0 && player.pot <= player.potNotLessThan) {
            //         if (player.cash >= player.potNotLessThan) {
            //             player.pot  = player.potNotLessThan;
            //             player.cash = player.cash - (player.potNotLessThan - player.previousPot);

            //         } else {
            //             if (Math.abs(player.potNotLessThan - player.pot) <= player.cash) {
            //                 player.pot   = player.potNotLessThan;
            //                 player.cash -= Math.abs(player.potNotLessThan - player.previousPot); 
                        
            //             } else {
            //                 player.pot  = player.pot + player.cash;
            //                 player.cash = 0;
            //             }
            //         }
            //     }

            //     player.previousPot = player.pot;
            //     player.maxPot      = player.cash;

            //     updateObjectInArray(players, player);
            // }

            // return {
            //     ...state.players,
            //     players
            // }

        case actionTypes.SET_CURRENT_POT:
            players = [...state.players];

            // isws na elegxw ta previousPot
            if (state.canUpdateTablePot === 1) { 
                const currentPot = players.reduce((max, elem) => {
                    max = (elem.pot > max) ? elem.pot : max;   
                    return max;
                }, 0);
                            
                players.map(pl => {
                    pl.potNotLessThan = currentPot;
                });    
            }

            return {
                ...state.players,
                players
            }

        case actionTypes.SET_NEXT_PLAYER:
                players       = [...state.players];
                currentPlayer = players.find(pl => pl.seq === action.payload);
                restPlayers   = players.filter(elem => elem.isActive && elem.cash > 0 );
        
                if ((currentPlayer.pot >= currentPlayer.potNotLessThan || currentPlayer.cash === 0) && currentPlayer.changedPot === 1) { 
                    if (restPlayers.length >= 2) {
                        playerId                 = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                        player                   = restPlayers[playerId];
                        player.nextPlayer        = 1;
                        currentPlayer.nextPlayer = 0;

                        // alert('check winner - SET_NEXT_PLAYER');
                        currentPlayer.changedPot = 0;
                        updateObjectInArray(players, player);
                    
                    } 
                    
                    if (restPlayers.length === 1) {
                        // ean exw dio energa me cash > 0 mpainei enw den prepei
                        currentPlayer.nextPlayer = 0;
                        alert('only one left aaaaa');
                    }
                } 

                return {
                    ...state.players,
                    players
                }
    }

    return state;
}

export default playersReducer;

