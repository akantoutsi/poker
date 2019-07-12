import React from 'react';

import './Table.css';

const Table = props => {
    return (
        <div className='gen'>
            <div className='player-info-2'>
                <div>Player 2</div>
                <hr />
                <div>
                    $ 1.200
                    <input type='number' min='0' step='0.1' />
                    <button>Ok</button> 
                </div>
            </div>

            <div className='player-2'>
                <div className='center'>Seat Open / Player 2</div>
            </div>

            <div className='player-info-3'>
                <div>Player 3</div>
                <hr />
                <div>
                    $ 1.200
                    <input type='number' min='0' step='0.1' />
                    <button>Ok</button> 
                </div>
            </div>

            <div className='player-3'>
                <div className='center'>Seat Open / Player 3</div>
            </div>

            <div className='Table'></div>

            <div className='player-info-1'>
                <div>Player 1</div>
                <hr />
                <div>
                    $ 1.000
                    <input type='number' min='0' step='0.1' />
                    <button>Ok</button> 
                </div>
            </div>

            <div className='player-1'>
                <div className='center'>Seat Open / Player 1</div>
            </div>    

            <div className='player-info-4'>
                <div>Player 4</div>
                <hr />
                <div>
                    $ 800
                    <input type='number' min='0' step='0.1' />
                    <button>Ok</button> 
                </div>
            </div>

            <div className='player-4'>
                <div className='center'>Seat Open / Player 4</div>
            </div>
        </div>
    );
}

export default Table;