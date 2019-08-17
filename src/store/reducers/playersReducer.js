import * as actionTypes                                    from '../actionTypes';
import { updateObjectInArray, findMaxPot, allHaveSamePot } from '../utils';

const initialState = {
    canUpdateTablePot: 1,
    openBoardCards: 0,
    openAllBoardCards: 0,
    alreadyOpenedCards: 0,
    players: [],
    possibleWinners: [],
    tablePot: 0,
    potsCount: 0,
    howManyPlayersChecked: 0
};

const playersReducer = (state = initialState, action) => {
    let players;
    let restPlayers;
    let player;
    let currentPlayer;
    let playerId;
    let canUpdateTablePot;
    let openBoardCards        = 0;
    let openAllBoardCards     = 0;
    let alreadyOpenedCards    = 0;
    let maxPot                = 0;
    let activePlayers         = [];
    let possibleWinners       = [];
    let tablePot              = 0;
    let potsCount             = 0;
    let howManyPlayersChecked = 0;

    switch (action.type) {
        case actionTypes.UPDATE_POTS_COUNT:
            players   = [...state.players];
            potsCount = state.potsCount;
            potsCount += 1;

            let tmp = players.map(elem => ({...elem, changedPot: 0}));

            return {
                ...state,
                players: tmp,
                potsCount: potsCount
            }

        case actionTypes.RESET_POTS_COUNT:
            potsCount = state.potsCount;
            potsCount = 0;

            return {
                ...state,
                potsCount: potsCount
            }

        case actionTypes.RESET_PLAYERS:
            players = [];
            
            return {
                ...state,
                players: players
            }
    
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

            player.changedPot = 1;

            if (player.changedPot === 1) {
                canUpdateTablePot = state.canUpdateTablePot; 
                canUpdateTablePot = 1; 
            }

            updateObjectInArray(players, player);

            return {
                ...state,
                players: players,
                canUpdateTablePot: canUpdateTablePot
            }

        case actionTypes.DECREMENT_PLAYER_POT:
            players           = [...state.players];
            player            = players.find(pl => pl.seq === action.payload);
            canUpdateTablePot = state.canUpdateTablePot;

            if (player.pot - 1 >= player.potNotLessThan) {
                if (player.pot-1 !== player.previousPot) {
                    player.pot  -= 1; 
                    player.cash += 1;
    
                    updateObjectInArray(players, player);
                    
                    canUpdateTablePot = 1; 
                }

            } else {
                canUpdateTablePot = 0; 
            }

            return {
                ...state,
                players: players,
                canUpdateTablePot: canUpdateTablePot
            }

        case actionTypes.EXIT_GAME:
            players                   = [...state.players];
            possibleWinners           = [...state.possibleWinners];
            currentPlayer             = players.find(pl => pl.seq === action.payload);
            currentPlayer.nextPlayer  = 0;
            currentPlayer.isActive    = 0;
            restPlayers               = players.filter(elem => elem.isActive && elem.cash > 0);
            alreadyOpenedCards        = state.alreadyOpenedCards;
            openBoardCards            = state.openBoardCards;
            openAllBoardCards         = state.openAllBoardCards;
            currentPlayer.previousPot = currentPlayer.previousPot;
            currentPlayer.maxPot      = currentPlayer.maxPot;
            howManyPlayersChecked     = state.howManyPlayersChecked;

            if (restPlayers.length >= 2) {
                let hasAnyonePot = restPlayers.reduce((acc, elem) => { acc += (elem.changedPot === 0) ? 0 : 1; return acc; }, 0);
        
                if (hasAnyonePot === 0) {
                    if (howManyPlayersChecked === restPlayers.length) {
                        openBoardCards        = 1;
                        howManyPlayersChecked = 0;
                    }
    
                    playerId          = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                    player            = restPlayers[playerId];
                    player.nextPlayer = 1;
                    player.changedPot = 0;
                
                } else {
                    playerId          = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                    player            = restPlayers[playerId];
                    player.nextPlayer = 1;
                    player.changedPot = 0;
                    
                    updateObjectInArray(players, player);

                    activePlayers = players.filter(elem => elem.isActive);
                    maxPot        = findMaxPot(activePlayers, 'pot');

                    if (allHaveSamePot(restPlayers, 'pot', maxPot) === restPlayers.length && !alreadyOpenedCards) {
                        openBoardCards     = 1;
                        alreadyOpenedCards = 1;
                    }
                }
            } 

            if (restPlayers.length <= 1) {
                possibleWinners   = players.filter(elem => elem.isActive);
                openAllBoardCards = 1;
            }

            return {
                ...state,
                players: players,
                openBoardCards: openBoardCards,
                openAllBoardCards: openAllBoardCards,
                alreadyOpenedCards: alreadyOpenedCards,
                possibleWinners: possibleWinners,
                howManyPlayersChecked: howManyPlayersChecked
            }

        case actionTypes.UPDATE_ALL_PLAYERS_CURRENT_POT:
            players       = [...state.players];
            activePlayers = players.filter(elem => elem.isActive && elem.cash >= 0);

            if (state.canUpdateTablePot === 1) {   
                const currentPot = findMaxPot(activePlayers, 'pot');

                players.map(pl => {
                    return pl.potNotLessThan = currentPot;
                });    
            }

            return {
                ...state,
                players: players
            }

        case actionTypes.RESET_TABLE_POT:
            tablePot = 0;

            return {
                ...state,
                tablePot: tablePot
            }

        case actionTypes.SET_TABLE_POT:
            players       = [...state.players];
            activePlayers = players.filter(elem => elem.isActive && elem.cash >= 0);
            tablePot      = activePlayers.reduce((acc, elem) => { acc += elem.pot; return acc; }, 0);

            return {
                ...state,
                tablePot: tablePot
            }

        case actionTypes.SET_NEXT_PLAYER:
            players                   = [...state.players];
            possibleWinners           = [...state.possibleWinners];
            currentPlayer             = players.find(pl => pl.seq === action.payload);
            restPlayers               = players.filter(elem => elem.isActive && elem.cash > 0);
            openBoardCards            = state.openBoardCards;
            openAllBoardCards         = state.openAllBoardCards;
            alreadyOpenedCards        = state.alreadyOpenedCards;
            alreadyOpenedCards        = 0;
            currentPlayer.previousPot = currentPlayer.pot;
            currentPlayer.maxPot      = currentPlayer.cash;
            canUpdateTablePot         = state.canUpdateTablePot;
            potsCount                 = state.potsCount;
            howManyPlayersChecked     = state.howManyPlayersChecked;

            if ((currentPlayer.pot >= currentPlayer.potNotLessThan || currentPlayer.cash === 0) && currentPlayer.changedPot === 1) { 
                howManyPlayersChecked = 0;

                if (restPlayers.length >= 2) {
                    playerId                 = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                    player                   = restPlayers[playerId];
                    player.nextPlayer        = 1;
                    currentPlayer.nextPlayer = 0;
                    currentPlayer.changedPot = 1;

                    updateObjectInArray(players, player);
                    activePlayers = players.filter(elem => elem.isActive);
                    maxPot        = findMaxPot(activePlayers, 'pot');

                    if (allHaveSamePot(restPlayers, 'pot', maxPot) === restPlayers.length && !alreadyOpenedCards) {
                        openBoardCards     = 1;
                        alreadyOpenedCards = 1;
                    }
                } 
                
                if (restPlayers.length === 0) {
                    alert('next - vres nikiti');
                    currentPlayer.nextPlayer = 0;
                    possibleWinners          = players.filter(elem => elem.isActive);
                    openAllBoardCards        = 1;
                } 

                if (restPlayers.length === 1 && currentPlayer.cash >= 0) {
                    if (restPlayers[0].changedPot === 0) {
                        currentPlayer.nextPlayer  = 0;
                        restPlayers[0].nextPlayer = 1;
                        restPlayers[0].changedPot = 1;
                    
                    } else {
                        currentPlayer.nextPlayer = 0;
                        alert('next - vres nikiti');
                        possibleWinners   = players.filter(elem => elem.isActive);
                        openAllBoardCards = 1;
                    }
                } 
                
                possibleWinners   = players.filter(elem => elem.isActive);
                canUpdateTablePot = 1;

            
            } else {
                let hasAnyonePot = restPlayers.reduce((acc, elem) => { acc += (elem.changedPot === 0) ? 0 : 1; return acc; }, 0);
                
                if (hasAnyonePot === 0) {
                    howManyPlayersChecked += 1;

                    if (howManyPlayersChecked === restPlayers.length) {
                        openBoardCards        = 1;
                        howManyPlayersChecked = 0;
                    }

                    playerId                 = restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1 ? restPlayers.findIndex(elem => elem.seq > currentPlayer.seq) : 0;
                    player                   = restPlayers[playerId];
                    player.nextPlayer        = 1;
                    currentPlayer.nextPlayer = 0;
                    currentPlayer.changedPot = 0;
                    possibleWinners          = players.filter(elem => elem.isActive);
                }
            }

            return {
                ...state,
                players: players,
                openBoardCards: openBoardCards,
                openAllBoardCards: openAllBoardCards,
                alreadyOpenedCards: alreadyOpenedCards,
                canUpdateTablePot: canUpdateTablePot,
                possibleWinners: possibleWinners,
                howManyPlayersChecked: howManyPlayersChecked
            }

        case actionTypes.RESET_OPEN_CARDS_FLAGS:
            return {
                ...state,
                openBoardCards: 0,
                openAllBoardCards: 0
            }

        case actionTypes.NONE_NEXT_PLAYER:
            let tmpPlayers = [...state.players];
            players        = tmpPlayers.map(elem => ({...elem, nextPlayer: 0}));

            return {
                ...state,
                players: players
            }
    }
    
    return state;
}

export default playersReducer;

