import * as actionTypes from '../actionTypes';

const initialState = {
    initCards: [
        { suit: 'hearts',  value: 'A'  },
        { suit: 'hearts',  value: 'K'  },
        { suit: 'hearts',  value: 'Q'  },
        { suit: 'hearts',  value: 'J'  },
        { suit: 'hearts',  value: '10' },
        { suit: 'hearts',  value: '9'  },
        { suit: 'hearts',  value: '8'  },
        { suit: 'hearts',  value: '7'  },
        { suit: 'hearts',  value: '6'  },
        { suit: 'hearts',  value: '5'  },
        { suit: 'hearts',  value: '4'  },
        { suit: 'hearts',  value: '3'  },
        { suit: 'hearts',  value: '2'  },
        { suit: 'clubs',   value: 'A'  },
        { suit: 'clubs',   value: 'K'  },
        { suit: 'clubs',   value: 'Q'  },
        { suit: 'clubs',   value: 'J'  },
        { suit: 'clubs',   value: '10' },
        { suit: 'clubs',   value: '9'  },
        { suit: 'clubs',   value: '8'  },
        { suit: 'clubs',   value: '7'  },
        { suit: 'clubs',   value: '6'  },
        { suit: 'clubs',   value: '5'  },
        { suit: 'clubs',   value: '4'  },
        { suit: 'clubs',   value: '3'  },
        { suit: 'clubs',   value: '2'  },
        { suit: 'spades',  value: 'A'  },
        { suit: 'spades',  value: 'K'  },
        { suit: 'spades',  value: 'Q'  } ,
        { suit: 'spades',  value: 'J'  },
        { suit: 'spades',  value: '10' },
        { suit: 'spades',  value: '9'  },
        { suit: 'spades',  value: '8'  },
        { suit: 'spades',  value: '7'  },
        { suit: 'spades',  value: '6'  },
        { suit: 'spades',  value: '5'  },
        { suit: 'spades',  value: '4'  },
        { suit: 'spades',  value: '3'  },
        { suit: 'spades',  value: '2'  },
        { suit: 'diams',   value: 'A'  },
        { suit: 'diams',   value: 'K'  },
        { suit: 'diams',   value: 'Q'  },
        { suit: 'diams',   value: 'J'  },
        { suit: 'diams',   value: '10' },
        { suit: 'diams',   value: '9'  },
        { suit: 'diams',   value: '8'  },
        { suit: 'diams',   value: '7'  },
        { suit: 'diams',   value: '6'  },
        { suit: 'diams',   value: '5'  },
        { suit: 'diams',   value: '4'  },
        { suit: 'diams',   value: '3'  },
        { suit: 'diams',   value: '2'  }
    ],
    round: 0,
    dealerId: actionTypes.DEALER_ID,
    numOfPlayers: actionTypes.NUM_OF_PLAYERS
};

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
    }

    return state;
}

export default tableReducer;

