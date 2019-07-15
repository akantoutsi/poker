import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Card                 from '../../components/Card/Card';

import './Board.css';

// mipws functional component?
class Board extends Component {
    render() { 
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