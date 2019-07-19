import React, { Component } from 'react';
import Board                from '../Board/Board';
import Players              from '../Players/Players';
  
import './Table.css';

class Table extends Component {
    render() {
        // kathe fora pou vgainei nikitis na kanw to round 0 - de xerw pou tha xreiastei afto
        // if (this.props.tbl.round === 0) {
        //     this.props.storeBoardCards(boardCards);
        //     this.props.storePlayersCards(playerCards);
        // }

        return (
            <div className='window-class'>
                <div className='Table'>
                    <Players />
                    <Board />
                </div>
            </div> 
        );
    }
}

export default Table;
