import React, { Component } from 'react';
import { connect }          from 'react-redux'; 
import Player               from '../../components/Player/Player';
import * as actionTypes     from '../../store/actionTypes';

import './Players.css';

class Players extends Component {
    render() { 
        console.log(this.props.plr.players)
        return (
            <div> 
            {
                this.props.plr.players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} 
                                    nextPlayer      ={(this.props.firstPlayerId !== null) 
                                                    ? this.props.firstPlayerId 
                                                    : ( (player.nextPlayer === 1) ? player.seq : null )}
                                    incrementPot    ={(playerId)            => this.props.incrementPot(playerId)} 
                                    decrementPot    ={(playerId)            => this.props.decrementPot(playerId)} 
                                    exitGame        ={(playerId)            => this.props.exitGame(playerId)}
                                    updatePlayerPot ={(playerId, playerPot) => this.props.updatePlayerPot(playerId, playerPot)}
                                    updateCurrentPot={()                    => this.props.updateCurrentPot()} 
                                    setNextPlayer   ={(playerId)            => this.props.setNextPlayer(playerId)}
                                    resetFirstPlayer={()                    => this.props.resetFirstPlayer()} />
                        </div>
                    );
                })
            }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        plr          : state.players,
        firstPlayerId: state.board.firstPlayerId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        incrementPot    : (playerId)            => dispatch({type: actionTypes.INCREMENT_PLAYER_POT, payload: playerId}),
        decrementPot    : (playerId)            => dispatch({type: actionTypes.DECREMENT_PLAYER_POT, payload: playerId}),
        exitGame        : (playerId)            => dispatch({type: actionTypes.EXIT_GAME,            payload: playerId}),
        updatePlayerPot : (playerId, playerPot) => dispatch({type: actionTypes.UPDATE_PLAYER_POT,    payload: {playerId: playerId, playerPot: playerPot}}),
        updateCurrentPot: ()                    => dispatch({type: actionTypes.SET_CURRENT_POT}),
        setNextPlayer   : (playerId)            => dispatch({type: actionTypes.SET_NEXT_PLAYER,      payload: playerId}),
        resetFirstPlayer: ()                    => dispatch({type: actionTypes.RESET_FIRST_PLAYER})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
