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

export const checkToOpenCards = (arr, property) => {
    const currentPot = this.findMaxPot(arr, 'pot');

    return arr.reduce((acc, elem) => {
        acc = (elem[property] === currentPot) ? 1 : 0;
        return acc;
    }, 0);
}