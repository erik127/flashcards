export default function cardselector (deck, counter) {
  if (counter === 0) {
    let index = random(deck[0])
    console.log('grabbing a card from deck 0')
    return {deck: 0, card: deck[0][index]}
  } else if (counter % 3 === 0 && deck[1].length !== 0) {
    console.log('grabbing a card from deck 1')
    return {deck: 1, card: deck[1][0]}
  } else if (counter % 5 === 0 && deck[2].length !== 0) {
    console.log('grabbing a card from deck 2')
    return {deck: 2, card: deck[2][0]}
  } else if (counter % 11 === 0 && deck[3].length !== 0) {
    console.log('grabbing a card from deck 3')
    return {deck: 3, card: deck[3][0]}
  } else if (deck[0].length !== 0) {
    let index = random(deck[0])
    console.log('grabbing a card from deck 0')
    return {deck: 0, card: deck[0][index]}
  } else if (deck[1].length !== 0) {
    console.log('grabbing a card from deck 1, deck 0 is empty')
    return {deck: 1, card: deck[1][0]}
  } else if (deck[2].length !== 0) {
    console.log('grabbing a card from deck 2, deck 0 and 1 are empty')
    return {deck: 2, card: deck[2][0]}
  } else {
    if (confirm('congrationlations, you mastered it! Do you want to reshuffle the cards?')) {
      deck[0] = deck[3]
      deck[3] = []
      let index = random(deck[0])
      return {deck: 0, card: deck[0][index]}
    } else {
      alert('OK, bye, chao, doei')
      return 'end'
    }
  }
}

let random = deck => Math.floor(Math.random() * deck.length)
