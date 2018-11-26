export default function cardselector (deck, counter) {
  let index
  if (counter === 0) {
    index = random(deck[0])
    return {deck: 0, index}
  } else if (counter % 3 === 0 && deck[1].length !== 0) {
    index = random(deck[1])
    return {deck: 1, index}
  } else if (counter % 5 === 0 && deck[2].length !== 0) {
    index = random(deck[2])
    return {deck: 2, index}
  } else if (counter % 11 === 0 && deck[3].length !== 0) {
    index = random(deck[3])
    return {deck: 3, index}
  } else if (deck[0].length !== 0) {
    let index = random(deck[0])
    return {deck: 0, index}
  } else if (deck[1].length !== 0) {
    index = random(deck[1])
    return {deck: 1, index}
  } else if (deck[2].length !== 0) {
    index = random(deck[2])
    return {deck: 2, index}
  } else {
    return 'end'
  }
}

let random = deck => Math.floor(Math.random() * deck.length)
