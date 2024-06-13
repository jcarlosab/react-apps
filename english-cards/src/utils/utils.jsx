import a1 from '../mocks/a1.json'
import a2 from '../mocks/a2.json'
import b1 from '../mocks/b1.json'
import b2 from '../mocks/b2.json'
import c1 from '../mocks/c1.json'
import c2 from '../mocks/c2.json'

export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 20)
}

export const getLevel = (category) => {
    switch (category) {
        case 'a1':
        return a1
        case 'a2':
        return a2
        case 'b1':
        return b1
        case 'b2':
        return b2
        case 'c1':
        return c1
        case 'c2':
        return c2
        default:
        return []
    }
}

