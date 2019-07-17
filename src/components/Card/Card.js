import React from 'react';

import './Card.css';

const Card = props => {
    let cardClass = ['card'];

    cardClass.push('rank-' + props.value.toLowerCase());
    cardClass.push(props.suit);

    let cardUnicode = (props.suit === 'spades') ? 'U+2660' : 
                      (props.suit === 'clubs')  ? 'U+2663' : 
                      (props.suit === 'hearts') ? 'U+2665' : 'U+2666';

    return (
        <div className={cardClass.join(' ')}>
            <span className="rank">{props.value}</span>
            <span className="suit">{String.fromCharCode(cardUnicode)}</span>
        </div>
    );
}

export default Card;