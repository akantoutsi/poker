import React from 'react';

import './Card.css';

const Card = props => {
    return (
        <div> 
            Card
            <div className="playingCards [fourColours|faceImages|simpleCards|inText|rotateHand]">
            <strong>
                <span className="card rank-a clubs">
                    <span className="rank">A</span>
                    <span className="suit">&clubs;</span>
                </span>
            </strong>
            </div>
        </div>
    );
}

export default Card;