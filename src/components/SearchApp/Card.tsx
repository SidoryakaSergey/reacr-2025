import React from 'react';

interface Props {
  id: number;
  name: string;
  image: string;
  onClick: (id: number) => void;
}

const Card: React.FC<Props> = ({ id, name, image, onClick }) => (
  <div className="card" role="button" onClick={() => onClick(id)}>
    <img src={image} alt={name} />
    <p className="name">{name}</p>
  </div>
);

export default Card;
