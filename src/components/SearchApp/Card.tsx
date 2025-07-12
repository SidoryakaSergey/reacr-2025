import React from 'react';

interface Props {
  name: string;
  image: string;
}

class Card extends React.Component<Props> {
  render() {
    return (
      <div className="card">
        <img src={this.props.image} alt={this.props.name} />
        <p className="name">{this.props.name}</p>
      </div>
    );
  }
}

export default Card;
