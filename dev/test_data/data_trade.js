import ashImage from './ash.jpg';
import stunfiskImage from './stunfisk.png';

const USER_DATA = {
  id: 0,
  profile_url: ashImage,
  reputation: 0,
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
  offers: [OFFER_DATA, OFFER_DATA],
  completed: false,
  accepted_offer: null,
  rating: null,
};

const TRADES = [];
for (let i = 0; i < 7; ++i) {
  TRADES.push(TRADE_DATA);
};

export default TRADES;
