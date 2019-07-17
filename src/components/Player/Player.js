import React        from 'react';
import Card         from '../Card/Card';
import NumericInput from 'react-numeric-input';

import './Player.css';

const Player = props => {
    let playerId = props.player.seq + 1;
    
    return ( 
        <div id={'player-' + playerId} className='player-info'>   
            <div className='center-player-info'> 
                Player {props.player.seq + 1}
                <hr />
                Cash: {'$' + ( parseFloat(props.player.cash).toFixed(2) - (!isNaN(parseFloat(props.player.pot).toFixed(2)) ? parseFloat(props.player.pot).toFixed(2) : 0) )}
                <br />
                Pot: {(parseFloat(props.player.pot).toFixed(2) > 0) ? '$' + parseFloat(props.player.pot).toFixed(2) : 0}

                <button className='update-pot-btn' onClick={props.incrementPot}>+</button> 
                
                <NumericInput
                    style={false}
                    precision={2}
                    size={props.player.cash.toString().length}
                    min={0} 
                    max={props.player.cash}
                    step={1}
                    readOnly
                />
                
                <button className='update-pot-btn' onClick={props.decrementPot}>-</button>
            </div>

            <div className='center-player-info-cards'>
                {
                    props.player.cards.map((card, index) => {
                        return (
                            <div key={index}>
                                <div className="playingCards">
                                    <Card value={card.value} suit={card.suit} />
                                </div>
                            </div>
                        );
                    })
            }
            </div>
        </div>
    );
}

export default Player;