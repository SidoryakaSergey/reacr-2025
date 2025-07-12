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

class CardList extends React.Component<Props> {
  render() {
    return (
      <div className="results-body">
        {this.props.characters.map((char) => (
          <Card key={char.id} name={char.name} image={char.image} />
        ))}
      </div>
    );
  }
}

export default CardList;
