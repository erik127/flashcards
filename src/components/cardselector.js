export default function cardselector (deck, counter) {
  if (counter === 0) {
    let index = random(deck[0])
    return {deck: 0, card: deck[0][index]}
  } else if (counter % 3 === 0 && deck[1].length !== 0) {
    return {deck: 1, card: deck[1][0]}
  } else if (counter % 5 === 0 && deck[2].length !== 0) {
    return {deck: 2, card: deck[2][0]}
  } else if (counter % 11 === 0 && deck[3].length !== 0) {
    return {deck: 3, card: deck[3][0]}
  } else if (deck[0].length !== 0) {
    let index = random(deck[0])
    return {deck: 0, card: deck[0][index]}
  } else if (deck[1].length !== 0) {
    return {deck: 1, card: deck[1][0]}
  } else if (deck[2].length !== 0) {
    return {deck: 2, card: deck[2][0]}
  } else {
    return 'end'
  }
}

let random = deck => Math.floor(Math.random() * deck.length)
