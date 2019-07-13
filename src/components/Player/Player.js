import React from 'react';
import Card  from '../Card/Card';

import './Player.css';

const Player = props => {
    return (
        <div>
            <div className='player-info'>
                <div>Player 2</div>
                <hr />
                <div>
                    $ 1.200
                    <input type='number' min='0' step='0.1' />
                    <button>Ok</button> 
                </div>
            </div>

            <div className='player'>
                <div className='center'>Seat Open / Player 2</div>
            </div>

            {
                props.player.cards.map((card, index) => {
                    return (
                        <div key={index}>
                            <Card value={card.value} suit={card.suit} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Player;