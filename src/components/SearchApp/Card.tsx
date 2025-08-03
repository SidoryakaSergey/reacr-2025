import React from 'react';
import { useSelectedItemsStore } from '../../store/selectedItemsStore';

interface Props {
  id: number;
  name: string;
  image: string;
  onClick: (id: number) => void;
}

const Card: React.FC<Props> = ({ id, name, image, onClick }) => {
  const { selected, toggleItem } = useSelectedItemsStore();
  const isSelected = !!selected[id];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // не триггерить onClick
    toggleItem({ id, name, image });
  };

  return (
    <div className="card" role="button" onClick={() => onClick(id)}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <img src={image} alt={name} />
      <p className="name">{name}</p>
    </div>
  );
};

export default Card;
