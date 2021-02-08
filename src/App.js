import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


const CARD_COUNT = 24;


class App extends Component {
  
  constructor(props){
    super(props);

    //initial state which has a blank list of cards
    this.state = {
      cards: [],
      lastFlipped: null,
      playerclicks: 0
    };

    //bind statement
    this.generateCards = this.generateCards.bind(this);
    this.flipCard = this.flipCard.bind(this);
  }


  //function that generate the cards
  generateCards() {
    //start of with a blank card and initialize number 
    let cards = [];
    let number = 0;

    // creating 2 cards for each number
    for (let i = 0; i < CARD_COUNT; i += 2) {
      number++;
      //creating 2 cards
      let card1 = { flipped: true, matched: false, number};
      let card2 = { flipped: true, matched: false, number};

      //adding the 2 cards to the card list
      cards = [...cards, card1, card2];
    }

    //randomize the cards
    for (let i = 0; i < cards.length; i++) {
      //for each card, pick a random one
      const swapCard = Math.floor(Math.random() * cards.length);
      //swap the 2 cards in place
      [cards[i], cards[swapCard]] = [cards[swapCard], cards[i]];
    }
    //update the state to start over the game
    this.setState({ playerClickCount: 0, cards });
  }

  //function to render multiple cards
  renderCard(card, index) {
    //adding a css class
    let classes = ["Card"];
    if (card.flipped) {
      classes = [...classes, "flipped"];
    }
    //if the card is matched we also add a class
    if (card.matched) {
      classes = [...classes, "matched"];
    }
    
    //set a unique key for the card to avoid errors
    let key = `card-${index}`;

    return (
      <div key={key} className={classes.join(" ") } onClick={ () => this.flipCard(index) }>
        {!card.flipped && card.number}
      </div>
    );
  }

  //function to manage the logic
  flipCard(index) {
    let cards = this.state.cards;

    //store the current card
    let card = cards[index];

    //incrementing the number of clicks
    let playerclicks = this.state.playerclicks + 1;

    //set lastflipped
    let lastFlipped = this.state.lastFlipped;

    //toggle the flipped state of the card that was just clicked
    if (lastFlipped === null ) {
      cards = this.flipAllBackOver(cards);
      card.flipped = !card.flipped;
      lastFlipped = index;
    } else {
      card.flipped = !card.flipped;
      let lastFlippedTitle = this.state.cards[lastFlipped];
     /*  if the last flipped card # matches the # of the card, 
     we will click and update the matched properties to true */
     if (lastFlippedTitle.number === card.number) {
       lastFlippedTitle.matched = true;
       card.matched = true;
       cards[lastFlipped] = lastFlippedTitle;
       lastFlipped = null;
     }
    
    }
    cards[index] = card;
    this.setState({ playerclicks, cards, lastFlipped});
  }


  //helper function to render the player click count display

  playerClickCount() {
    return this.state.playerclicks;
  }


  //helper function to flip all of the cards back over unless they're matched

  flipAllBackOver(cards) {
    //for each card, we want to see if it's matched. if it isn't we flip it back over
    cards.forEach(card => {
      if (!card.matched) {
        card.flipped = true;
      }
    });
    return cards;
  }






  render() {
    return (
      <div className="App">
        <h1>Welcome to Flippo Cards!</h1>
        <br/>
        <small>For each Card see if it is matched. You will see a Green back color.</small>
        <br/>
        <small>If the Card not matched, it will be flipped back over.</small>
        <br/><br/>
        <strong>Clicks: {this.playerClickCount()}</strong>
        <br/><br/>
        <button onClick={this.generateCards} className="reset">New Game</button>
        <hr/>
        {/* render multiple cards */}
        {this.state.cards.map((card, index) => this.renderCard(card, index))}
      </div>
    )
  }
}

export default App;
