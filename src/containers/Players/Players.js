import React, { Component } from 'react';
import { connect }          from 'react-redux'; 
import Player               from '../../components/Player/Player';
import _                    from 'lodash';
import * as actionTypes     from '../../store/actionTypes';

import './Players.css';

class Players extends Component {
    render() { 
        console.log(this.props.plr.players);
        return (
            <div className='Players'> 
            {
                this.props.plr.players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} changed={(playerId, playerPot) => this.props.updatePlayerPot(playerId, playerPot)} />
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
        updatePlayerPot: (playerId, playerPot) => dispatch({type: actionTypes.STORE_PLAYER_POT, payload: {playerId: playerId, playerPot: playerPot}})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
