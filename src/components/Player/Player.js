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
                    Cash: {'$' + ( parseFloat(props.player.cash).toFixed(2) - (!isNaN(parseFloat(props.player.pot).toFixed(2)) ? parseFloat(props.player.pot).toFixed(2) : 0) )}
                    <br />
                    Pot: {(parseFloat(props.player.pot).toFixed(2) > 0) ? '$' + parseFloat(props.player.pot).toFixed(2) : 0}

                    {/* <input  type='number' 
                            min={0} 
                            max={props.player.cash} 
                            step={0.01}
                            onChange={(event) => props.changed(props.player.seq, event.target.value)} /> */}
                    
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