import React from 'react';
import Card  from '../Card/Card';

import './Player.css';

const Player = props => {
    // console.log(props);
    return (     
        <div className='Player'>
            <div className='player-info'>
                <div>Player {props.player.seq + 1}</div>
                <hr />
                <div>
                    Cash: {'$' + ( parseInt(props.player.cash) - (!isNaN(parseInt(props.player.pot)) ? parseInt(props.player.pot) : 0) )}
                    <br />
                    Pot: {(parseInt(props.player.pot) > 0) ? '$' + parseInt(props.player.pot) : 0}
                    <input type='number' min='0' step='0.1' onChange={(event) => props.changed(props.player.seq, event.target.value)} />
                    {/* <button onClick={(event) => props.clicked(props.player.seq, event.target.value)}>Ok</button>  */}
                </div>
            </div>

            <div className='player'>
                <div className='center'>{(props.player.seq > 0) ? 'Player ' + props.player.seq : 'Seat Open'}</div>
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