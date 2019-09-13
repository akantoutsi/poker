import React            from 'react';
import { connect }      from 'react-redux'; 
import Player           from 'player';
import * as actionTypes from '../../../../store/actionTypes';

import './Players.css';

const Players = ({ 
    tbl,  
    incrementPot,
    decrementPot, 
    exitGame,
    setNextPlayer,
    updateCurrentPot,
    setTablePot,
    resetFirstPlayer,
    selected
}) => {

    return (
        <div> 
            {
                tbl.players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} 
                                    nextPlayer      ={(tbl.firstPlayerId !== null) 
                                                    ? tbl.firstPlayerId 
                                                    : ( (player.nextPlayer === 1) ? player.seq : null )}
                                    incrementPot    ={incrementPot} 
                                    decrementPot    ={decrementPot} 
                                    exitGame        ={exitGame} 
                                    setNextPlayer   ={setNextPlayer}
                                    updateCurrentPot={updateCurrentPot}
                                    setTablePot     ={setTablePot}
                                    resetFirstPlayer={resetFirstPlayer}
                                    selected        ={selected} 
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        tbl: state.table
    };
};

const mapDispatchToProps = dispatch => {
    return {
        incrementPot    : (playerId) => dispatch({type: actionTypes.INCREMENT_PLAYER_POT, payload:    playerId}),
        decrementPot    : (playerId) => dispatch({type: actionTypes.DECREMENT_PLAYER_POT, payload:    playerId}),
        exitGame        : (playerId) => dispatch({type: actionTypes.EXIT_GAME,                        payload: playerId}),
        updateCurrentPot: ()         => dispatch({type: actionTypes.UPDATE_ALL_PLAYERS_CURRENT_POT}),
        setTablePot     : ()         => dispatch({type: actionTypes.SET_TABLE_POT}),
        setNextPlayer   : (playerId) => dispatch({type: actionTypes.SET_NEXT_PLAYER,                  payload: playerId}),
        resetFirstPlayer: ()         => dispatch({type: actionTypes.RESET_FIRST_PLAYER})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
