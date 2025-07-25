import React from 'react';

interface Props {
  name: string;
  image: string;
}

const Card: React.FC<Props> = ({ name, image }) => (
  <div className="card">
    <img src={image} alt={name} />
    <p className="name">{name}</p>
  </div>
);

export default Card;
