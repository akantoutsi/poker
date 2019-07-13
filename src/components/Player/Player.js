import React from 'react';
import Card  from '../Card/Card';

import './Player.css';

const Player = props => {
    console.log(props);
    return (
        <div className='Player'>
            <div className='player-info'>
                <div>Player {props.seq + 1}</div>
                <hr />
                <div>
                    {(props.cash > 0) ? '$' + props.cash : 0}
                    <input type='number' min='0' step='0.1' />
                    <button>Ok</button> 
                </div>
            </div>

            <div className='player'>
                <div className='center'>{(props.seq > 0) ? 'Player ' + props.seq : 'Seat Open'}</div>
            </div>

            {
                props.player.cards.map((card, index) => {
                    return (
                        <div className="playingCards" key={index}>
                            <Card value={card.value} suit={card.suit} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Player;