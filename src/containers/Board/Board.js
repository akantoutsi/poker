import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Card                 from '../../components/Card/Card';

import './Board.css';

// mipws functional component?
class Board extends Component {
    render() { 
        const allCards = <div className="card back">*</div>;

        return (
            <div className='Board'> 
                {
                    this.props.brd.cards.map((card, index) => {
                        return (
                            <div className="playingCards" key={index}>
                                <Card value={card.value} suit={card.suit} />
                            </div>
                        );
                    })
                }

                <div className="playingCards all-cards">
                    {allCards}
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        brd: state.board
    };
}

export default connect(mapStateToProps)(Board);