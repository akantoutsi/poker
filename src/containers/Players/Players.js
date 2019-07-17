import React, { Component } from 'react';
import { connect }          from 'react-redux'; 
import Player               from '../../components/Player/Player';
import * as actionTypes     from '../../store/actionTypes';

import './Players.css';

class Players extends Component {
    render() { 
        return (
            <div> 
            {
                this.props.plr.players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} 
                                    incrementPot={(playerId) => this.props.incrementPot(playerId)} 
                                    decrementPot={(playerId) => this.props.decrementPot(playerId)} />
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
        plr: state.players
    };
}

const mapDispatchToProps = dispatch => {
    return {
        incrementPot: (playerId) => dispatch({type: actionTypes.INCREMENT_PLAYER_POT, payload: playerId}),
        decrementPot: (playerId) => dispatch({type: actionTypes.DECREMENT_PLAYER_POT, payload: playerId})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
