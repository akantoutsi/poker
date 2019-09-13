import React from 'react';

import './Action.css';

const Action = ({ 
    pot, 
    seq, 
    incrementPot, 
    decrementPot, 
    resetFirstPlayer, 
    exitGame, 
    setNextPlayer,
    updateCurrentPot,
    setTablePot
 }) => {
    
    return (
        <div className='pot-btns'>
            <button className='update-pot-btn' onClick={() => incrementPot(seq)}>+</button> 

            <div style={{margin: '18px'}}>{pot}</div>

            <button className='update-pot-btn' onClick={() => decrementPot(seq)}>-</button>
            
            <button className='exit-btn' onClick={() => {resetFirstPlayer(); exitGame(seq)}}>
                <i className='fa fa-close'></i>
            </button> 

            <button className='next-btn' onClick={() => {resetFirstPlayer(); 
                                                         setNextPlayer(seq);
                                                         updateCurrentPot(); 
                                                         setTablePot();
                                                        }}>                                                         
                <strong>{`Next`}</strong>
            </button> 
        </div>
    );
}

export default Action;