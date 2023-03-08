import React from 'react';
import StarRating from './StarRating';
import CardInfo from './CardInfo';
import UserCards from './UserCards';

function ModalRoute({ handleModal, route, content }) {
  switch (route) {
    case 'StarRating':
      return <StarRating handleModal={handleModal} content={content} />;
    case 'UserCards':
      return <UserCards handleModal={handleModal} content={content} />;
    case 'CardInfo':
      return <CardInfo handleModal={handleModal} content={content} />;
    default:
      return <h5>Undefined Path</h5>;
  }
}

export default ModalRoute;
