export default function cardselector (deck, counter, lastDeck) {
  let index
  let length0 = deck[0].length
  let length1 = deck[1].length
  let length2 = deck[2].length
  let length3 = deck[3].length

  if (counter === 0) {
    index = random(length0)
    return {deck: 0, index}
  } else if (counter % 3 === 0 && length1 > 1 && lastDeck === 1) {
    index = random(length1 - 1)
    return {deck: 1, index}
  } else if (counter % 3 === 0 && length1 >= 1) {
    index = random(length1)
    return {deck: 1, index}
  } else if (counter % 5 === 0 && length2 > 1 && lastDeck === 2) {
    index = random(length2 - 1)
    return {deck: 2, index}
  } else if (counter % 5 === 0 && length2 >= 1) {
    index = random(length2)
    return {deck: 2, index}
  } else if (counter % 11 === 0 && length3 > 1 && lastDeck === 3) {
    index = random(length3 - 1)
    return {deck: 3, index}
  } else if (counter % 11 === 0 && length3 >= 1) {
    index = random(length3)
    return {deck: 3, index}
  } else if (length0 !== 0) {
    let index = random(length0)
    return {deck: 0, index}
  } else if (length1 !== 0) {
    index = random(length1)
    return {deck: 1, index}
  } else if (length2 !== 0) {
    index = random(length2)
    return {deck: 2, index}
  } else {
    return 'end'
  }
}

let random = length => Math.floor(Math.random() * length)
