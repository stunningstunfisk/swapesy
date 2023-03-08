import ashImage from './ash.jpg';
import stunfiskImage from './stunfisk.png';

const USER_DATA = {
  id: 0,
  profile_picture: ashImage,
  reputation: randomInteger(5),
  cards: [],
  name: 'Ash',
  bio: 'I\'m having a major hat crisis',
};

const USER_DATA_FOR_OFFERJS = {
  id: 0,
  profile_picture: 'https://avatarfiles.alphacoders.com/175/thumb-175691.png',
  reputation: randomInteger(5),
  cards: [],
  name: 'Ash',
  bio: 'I\'m having a major hat crisis',
};

const CARD_DATA = {
  id: 0,
  name: 'Stunning Stunfisk',
  condition: 'Literally GOLD',
  url: stunfiskImage,
  image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/SM8/SM8_EN_83.png',
  owner_of_card: USER_DATA,
}
const TRADE_DATA = {
  id: 0,
  title: 'Most Amazing Card EVER!',
  user_id: USER_DATA,
  cards: [CARD_DATA],
  offers: [],
  completed: false,
  accepted_offer: null,
  rating: null,
};

const OFFER_DATA = {
  id: 0,
  type: 'trade',
  cards: [CARD_DATA, CARD_DATA],
  user_id: USER_DATA,
  user: USER_DATA_FOR_OFFERJS,
  completed: false,
  listing: TRADE_DATA,
};


function randomInteger(max) {
  return Math.floor(Math.random() * max);
};

const TRADES = [];

for (let i = 0; i < 7; ++i) {
  let newTrade = JSON.parse(JSON.stringify(TRADE_DATA));
  let offers = randomInteger(12);

  for (let j = 0; j < offers; ++j) {
    newTrade.offers.push(OFFER_DATA);
  }
  TRADES.push(newTrade);
};


export default TRADES;
