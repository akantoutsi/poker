import React        from 'react';
import Card         from '../Card/Card';
import NumericInput from 'react-numeric-input';

import './Player.css';

const Player = props => {
    let playerId = props.player.seq + 1;
    
    return ( 
        <div id={'player-' + playerId} className='player-info'>   
            <div className='center-player-info'> 
                <strong>Player {props.player.seq + 1}</strong>
                <hr />

                Cash: {'€' + (props.player.cash)} - Pot: {'€' + props.player.pot}
                <br />

                <div className='pot-btns'>
                    <button className='update-pot-btn' onClick={() => props.incrementPot(props.player.seq)}>+</button> 
                    
                    <NumericInput
                        value={props.player.pot}
                        style={false}
                        className='input-pot'
                        readOnly
                    />
                    
                    <button className='update-pot-btn' onClick={() => props.decrementPot(props.player.seq)}>-</button>
                    <button className='next-btn' onClick={props.updateCurrentPot}><i className='fa fa-arrow-right'></i></button> 
                </div>
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