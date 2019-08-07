import React        from 'react';
import Card         from '../Card/Card';
// import NumericInput from 'react-numeric-input';

import './Player.css';

const Player = props => {
    const playerId = props.player.seq + 1;
    let classes    = [];
    classes.push((props.player.isActive === 0) ? 'inactive-player' : null);

    let nextPlayerBtns = null;

    if (props.nextPlayer === props.player.seq) {
        nextPlayerBtns = (
            <div className='pot-btns'>
                <button className='update-pot-btn' onClick={() => props.incrementPot(props.player.seq)}>+</button> 
                        
                {/* <NumericInput
                    value={props.player.pot}
                    style={false}
                    style={{backgroundColor: '#fbfbf9'}}
                    className='input-pot'
                    readOnly
                /> */}
                
                <div style={{margin: '18px'}}>{props.player.pot}</div>

                <button className='update-pot-btn' onClick={() => props.decrementPot(props.player.seq)}>-</button>
                
                <button className='exit-btn' onClick={() => {props.resetFirstPlayer(); props.exitGame(props.player.seq)}}>
                    <i className='fa fa-close'></i>
                </button> 

                <button className='next-btn' onClick={() => {props.resetFirstPlayer(); 
                                                             props.setNextPlayer(props.player.seq);
                                                             props.updateCurrentPot(); 
                                                             props.setTablePot();
                                                            }}>                                                         
                    <strong>{`Next`}</strong>
                </button> 
            </div>
        );
    }
    
    return ( 
        <div id={'player-' + playerId} className='player-info'>  
            <strong style={{color: 'red'}}>{`${props.player.isDealer ? 'D' : ''}`}</strong>
            <div className='center-player-info'> 
                {/* <strong className={classes.join(' ')}>{`Player ${props.player.seq + 1} ${props.player.isDealer ? '(Dealer)' : ''}`}</strong> */}
                <strong className={classes.join(' ')}>{`Player ${props.player.seq + 1}`}</strong>
                <hr />
                <div className={classes.join(' ')}>
                    {`Cash: €${props.player.cash} - Pot: €${props.player.pot}`}
                </div>
            </div>

            <div className='center-player-info center-player-btns'> 
                {nextPlayerBtns}
            </div>

            <div className='center-player-info-cards'>
                {
                    props.player.cards.map((card, index) => {
                        return (
                            <div key={index}>
                                <div className='playingCards'>
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