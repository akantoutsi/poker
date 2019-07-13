import React from 'react';

import './Card.css';

const Card = props => {
    let cardClass = ['card'];

    cardClass.push('rank-' + props.value.toLowerCase());
    cardClass.push(props.suit);

    let cardUnicode = (props.suit === 'spades') ? 'U+2660' : 
                      (props.suit === 'clubs')  ? 'U+2663' : 
                      (props.suit === 'hearts') ? 'U+2665' : 'U+2666';

    // const allCards = Array(52);

    // for (let i=0; i<52; i++) {
    //     allCards[i] = (
    //         <li>
    //             <div className="card back">*</div>
    //         </li>
    //     );
    // }

    return (
        <div className={cardClass.join(' ')}>
            <span className="rank">{props.value}</span>
            <span className="suit">{String.fromCharCode(cardUnicode)}</span>
        </div>

        // <div>
        //     <div className="playingCards [fourColours|faceImages|simpleCards|inText|rotateHand]">
        //         <ul className="deck">
        //             {/* {allCards} */}
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //             <li>
        //                 <div className="card back">*</div>
        //             </li>
        //         </ul>
        //         <div className="clear"></div>
        //     </div>
        // </div>
    );
}

export default Card;