// components/CharacterDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Character } from '../types';

const CharacterDetails: React.FC = () => {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!detailsId) return;
    setLoading(true);

    fetch(`https://rickandmortyapi.com/api/character/${detailsId}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data))
      .catch((err) => console.error('Details fetch error:', err))
      .finally(() => setLoading(false));
  }, [detailsId]);

  const handleClose = () => {
    navigate(`../`, { relative: 'path' }); // Убираем detailsId из URL
  };

  if (loading) return <p>Loading character...</p>;
  if (!character) return <p>Character not found</p>;

  return (
    <div className="character-details">
      <button onClick={handleClose}>Close</button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <ul>
        <li>Status: {character.status}</li>
        <li>Species: {character.species}</li>
        <li>Type: {character.type || 'N/A'}</li>
        <li>Gender: {character.gender}</li>
        <li>Origin: {character.origin.name}</li>
        <li>Location: {character.location.name}</li>
      </ul>
    </div>
  );
};

export default CharacterDetails;
