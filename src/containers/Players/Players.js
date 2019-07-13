import React, { Component } from 'react';
// import { connect }          from 'react-redux'; 
import Player               from '../../components/Player/Player';

import './Players.css';

class Players extends Component {
    render() { 
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

// const mapStateToProps = state => {
//     return {
//         plr: state.player
//     };
// }

// export default connect(mapStateToProps)(Players);
export default Players;