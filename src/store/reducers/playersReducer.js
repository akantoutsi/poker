import * as actionTypes                                    from '../actionTypes';
import { updateObjectInArray, findMaxPot, allHaveSamePot } from '../utils';

const initialState = {
    canUpdateTablePot: 1,
    openBoardCards: 0,
    alreadyOpenedCards: 0,
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
    let openBoardCards = 0;
    let alreadyOpenedCards = 0;

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
                players: state.players.concat(players)
            }

        case actionTypes.INCREMENT_PLAYER_POT:
            players = [...state.players];
            player  = players.find(pl => pl.seq === action.payload);

            if (player.cash > 0 && player.pot >= player.potNotLessThan && player.pot + 1 <= player.maxPot + player.previousPot) {
                player.pot       += 1; 
                player.cash      -= 1;
                player.changedPot = 1;
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
            canUpdateTablePot  = state.canUpdateTablePot; 
            canUpdateTablePot  = 1; 
            player.changedPot  = 1;

            updateObjectInArray(players, player);

            return {
                ...state,
                players: players,
                canUpdateTablePot: canUpdateTablePot
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
                ...state,
                players: players,
                canUpdateTablePot: canUpdateTablePot
            }

        case actionTypes.EXIT_GAME:
            players                  = [...state.players];
            currentPlayer            = players.find(pl => pl.seq === action.payload);
            currentPlayer.nextPlayer = 0;
            currentPlayer.isActive   = 0;
            restPlayers              = players.filter(elem => elem.isActive && elem.cash > 0);
            alreadyOpenedCards       = state.alreadyOpenedCards;

            if (restPlayers.length >= 2) {
                playerId                 = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                player                   = restPlayers[playerId];
                player.nextPlayer        = 1;
                player.changedPot        = 0;
                
                updateObjectInArray(players, player);

                if (allHaveSamePot(restPlayers, 'pot') === restPlayers.length && !alreadyOpenedCards) {
                    alert('exit - rixe filla katw');
                    openBoardCards     = 1;
                    alreadyOpenedCards = 1;
                }

                canUpdateTablePot = state.canUpdateTablePot; 
                canUpdateTablePot = 0; 
            } 

            if (restPlayers.length === 1) {
                alert('exit - vres nikiti');
            }

            return {
                ...state,
                players: players,
                canUpdateTablePot: canUpdateTablePot,
                openBoardCards: openBoardCards,
                alreadyOpenedCards: alreadyOpenedCards
            }

        case actionTypes.SET_CURRENT_POT:
            players = [...state.players];

            if (state.canUpdateTablePot === 1) {            
                const currentPot = findMaxPot(players, 'pot');

                players.map(pl => {
                    pl.potNotLessThan = currentPot;
                });    
            }

            return {
                ...state,
                players: players
            }

        case actionTypes.SET_NEXT_PLAYER:
            players            = [...state.players];
            currentPlayer      = players.find(pl => pl.seq === action.payload);
            restPlayers        = players.filter(elem => elem.isActive && elem.cash > 0);
            openBoardCards     = state.openBoardCards;
            alreadyOpenedCards = 0;

            if ((currentPlayer.pot >= currentPlayer.potNotLessThan || currentPlayer.cash === 0) && currentPlayer.changedPot === 1) { 
                if (restPlayers.length >= 2) {
                    playerId                 = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                    player                   = restPlayers[playerId];
                    player.nextPlayer        = 1;
                    currentPlayer.nextPlayer = 0;
                    currentPlayer.changedPot = 0;

                    updateObjectInArray(players, player);
                    
                    if (allHaveSamePot(restPlayers, 'pot') === restPlayers.length) {
                        alert('rixe filla katw');
                        openBoardCards = 1;
                    }
                } 
                
                if (restPlayers.length === 1) {
                    currentPlayer.nextPlayer = 0;
                    alert('next - vres nikiti');
                }
            } 

            return {
                ...state,
                players: players,
                openBoardCards: openBoardCards,
                alreadyOpenedCards: alreadyOpenedCards
            }
    }
    return state;
}

export default playersReducer;

