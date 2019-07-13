const initialState = {
    cards: [                
        { suit: 'spades', value: '2' },
        { suit: 'clubs',  value: '10'},
        { suit: 'diams',  value: '7' },
        { suit: 'spades', value: '7' },
        { suit: 'hearts', value: 'A' }
    ]
};

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        // case '':

        //     break;

        // default:
        //     break;
    }

    return state;
}

export default boardReducer;

