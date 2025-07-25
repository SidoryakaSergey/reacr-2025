import React from 'react';
import Card from './Card';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Props {
  characters: Character[];
}

const CardList: React.FC<Props> = ({ characters }) => (
  <div className="results-body">
    {characters.map((char) => (
      <Card key={char.id} name={char.name} image={char.image} />
    ))}
  </div>
);

export default CardList;
