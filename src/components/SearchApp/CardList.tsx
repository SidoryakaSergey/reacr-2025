import React from 'react';
import Card from './Card';
import { CharacterPreview } from '../../types';

interface Props {
  characters: CharacterPreview[];
  onCardClick: (id: number) => void;
}

const CardList: React.FC<Props> = ({ characters, onCardClick }) => (
  <div className="results-body">
    {characters.map((char) => (
      <Card key={char.id} id={char.id} name={char.name} image={char.image} onClick={onCardClick} />
    ))}
  </div>
);

export default CardList;
