import React from 'react';

import './Card.css';

const Card = props => {
    let cardClass = ['card'];

    cardClass.push('rank-' + props.value.toLowerCase());
    cardClass.push(props.suit);

    let cardUnicode = (props.suit === 'spades') ? 'U+2660' : 
                      (props.suit === 'clubs')  ? 'U+2663' : 
                      (props.suit === 'hearts') ? 'U+2665' : 'U+2666';

    // if (!props.afro) {
    //     return (
            // <div className={cardClass.join(' ')}>
            //     <span className='rank'>{props.value}</span>
            //     <span className='suit'>{String.fromCharCode(cardUnicode)}</span>
            // </div>
    //     );
    
    // } else {
    //     return (
    //         <div className={cardClass.join(' ')}>
    //             <strong>
    //                 <span className={`card rank-${props.value.toLowerCase()} ${props.suit}`}>    
    //                     <span className='rank'>{props.value}</span>
    //                     <span className='suit'>{String.fromCharCode(cardUnicode)}</span>
    //                 </span>
    //             </strong>
    //         </div>
    //     );
    // }
    
    return (
        props.openedCards
        ? 
        <div className={cardClass.join(' ')}>
            <span className='rank'>{props.value}</span>
            <span className='suit'>{String.fromCharCode(cardUnicode)}</span>
        </div>
        :
        <div className='card back'>*</div>
    );
}

export default Card;