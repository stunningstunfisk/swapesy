import React from 'react';
import StarRating from './StarRating';
import CardInfo from './CardInfo';
import UserCards from './UserCards';

function ModalRoute({ handleModal, route }) {
  switch (route) {
    case 'StarRating':
      return <StarRating handleModal={handleModal} />;
    case 'UserCards':
      return <UserCards handleModal={handleModal} />;
    case 'CardInfo':
      return <CardInfo handleModal={handleModal} />;
    default:
      return <h5>Undefined Path</h5>;
  }
}

export default ModalRoute;
