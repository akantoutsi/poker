import React, { Component } from 'react';
import { connect }          from 'react-redux'; 
import Player               from '../../components/Player/Player';
import _                    from 'lodash';

import './Players.css';

class Players extends Component {
    render() { 
        console.log(this.props);
        return (
            <div className='Players'> 
            {
                this.props.players.map((player, index) => {

                    return (
                        <div key={index}>
                            <Player player={player} />
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