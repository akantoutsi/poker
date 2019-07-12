import React from 'react';

import './Card.css';

const Card = props => {
    // const allCards = Array(52);

    // for (let i=0; i<52; i++) {
    //     allCards[i] = (
    //         <li>
    //             <div className="card back">*</div>
    //         </li>
    //     );
    // }

    return (
        <div> 
            Card
            <div className="playingCards [fourColours|faceImages|simpleCards|inText|rotateHand]">
                <ul className="deck">
                    {/* {allCards} */}
                    <li>
                        <div class="card back">*</div>
                    </li>
                    <li>
                        <div className="card back">*</div>
                    </li>
                    <li>
                        <div className="card back">*</div>
                    </li>
                    <li>
                        <div className="card back">*</div>
                    </li>
                
                </ul>
                <div className="clear"></div>

                {/* <strong>
                    <span className="card rank-a clubs">
                        <span className="rank">A</span>
                        <span className="suit">&clubs;</span>
                    </span>
                </strong> */}
            </div>
        </div>
    );
}

export default Card;