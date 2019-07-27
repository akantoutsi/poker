import _ from 'lodash';

export const updateObjectInArray = (array, obj) => {
    return array.map((item, index) => {
        if (index !== obj.index) {
            return item;
        }
    
        return {
            ...item,
            ...obj.item
        }
    })
}

export const findMaxPot = (arr, property) => {
    return arr.reduce((max, elem) => {
        max = (elem[property] > max) ? elem[property] : max;   
        return max;
    }, 0);
}

export const allHaveSamePot = (arr, property) => {
    const currentPot = findMaxPot(arr, property);

    return arr.reduce((acc, elem) => {
        acc += (elem[property] === currentPot) ? 1 : 0;
        return acc;
    }, 0);
}

export const checkIfCardsLeftToToOpen = (arr, property) => {
    return arr.reduce((acc, elem) => {
        acc += (elem[property] === false ? 1 : 0);
        return acc;
    }, 0);
}

export const cardsToOpen = (arr, property, openAllFlag) => {
    const cardsLeft     = checkIfCardsLeftToToOpen(arr, property);
    let   howManyToOpen = 0;
    let   fromIndex     = 0;
    let   slicedArr     = [];
    let   retArr        = [];

    if (!openAllFlag) {
        switch (cardsLeft) {
            case arr.length:
                howManyToOpen = 3;
                fromIndex     = 0;
                break;

            case 2:
                howManyToOpen = 1;
                fromIndex     = 3;  
                break;

            case 1:
                howManyToOpen = 1;
                fromIndex     = 4;
                break;
        }

        slicedArr = arr.slice(fromIndex, fromIndex + howManyToOpen);
        retArr    = slicedArr.map(e => ({...e, isVisible: true}));
    
        if (howManyToOpen === 3) {
            const [first, second, third] = retArr; 
            arr.splice(fromIndex, howManyToOpen, first, second, third);
    
        } else {
            const [first] = retArr; 
            arr.splice(fromIndex, howManyToOpen, first);
        }

    } else {
        howManyToOpen = arr.length;
        fromIndex     = 0;

        slicedArr = arr.slice();
        retArr    = slicedArr.map(e => ({...e, isVisible: true}));

        const [first, second, third, fourth, fifth] = retArr;
        arr.splice(fromIndex, howManyToOpen, first, second, third, fourth, fifth); 
    }

    return arr;
}