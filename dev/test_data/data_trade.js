import ashImage from './ash.jpg';
import stunfiskImage from './stunfisk_card.png';

const USER_DATA = {
  id: 0,
  profile_url: ashImage,
  reputation: randomInteger(5),
  cards: [],
  name: 'Ash',
  bio: 'I\'m having a major hat crisis'
};

const CARD_DATA = {
  id: 0,
  name: 'Stunning Stunfisk',
  condition: 'Literally GOLD',
  url: stunfiskImage,
  owner_of_card: USER_DATA,
};

const OFFER_DATA = {
  id: 0,
  cards: [CARD_DATA, CARD_DATA],
  user_id: USER_DATA,
  completed: false,
}

const TRADE_DATA =
{
  id: 0,
  title: 'Most Amazing Card EVER!',
  user_id: USER_DATA,
  cards: [CARD_DATA],
  offers: [],
  completed: false,
  accepted_offer: null,
  rating: null,
};


function randomInteger(max) {
  return Math.floor(Math.random() * max);
};

const TRADES = [];

let newTrade = JSON.parse(JSON.stringify(TRADE_DATA));
TRADES.push(newTrade);

for (let i = 0; i < 7; ++i) {
  let newTrade = JSON.parse(JSON.stringify(TRADE_DATA));
  let offers = randomInteger(12);

  for (let j = 0; j < offers; ++j) {
    newTrade.offers.push(OFFER_DATA);
  }
  TRADES.push(newTrade);
};


export default TRADES;
