import React, { Component } from 'react';
import { connect }          from 'react-redux'; 
import Player               from '../../components/Player/Player';
import _                    from 'lodash';

import './Players.css';

class Players extends Component {
    render() { 
        return (
            <div className='Players'> 
            {
                this.props.players.map((player, index) => {
                    let smallBlindId = (player.dealerId + 1 > this.props.players.length) 
                                     ? player.dealerId - this.props.players.length     
                                     : player.dealerId + 1;
   
                    let bigBlindId  = (player.dealerId + 2 > this.props.players.length) 
                                    ? player.dealerId - this.props.players.length + 1 
                                    : player.dealerId + 2;

                    return (
                        <div key={index}>
                            <Player player={player} seq={index} smallBlindId={smallBlindId} bigBlindId={bigBlindId} />
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
        // plr: state.player
        plr: state.table.players
    };
}

export default connect(mapStateToProps)(Players);