import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, Navigate } from 'react-router-dom';
import SearchControls from './SearchControls';
import CardList from './CardList';
import { CharacterPreview, ApiResponse } from '../../types';
import { useLocalStorageQuery } from '../../hooks/useLocalStorageQuery';

const SearchApp: React.FC = () => {
  const { page: pageParam } = useParams();
  const { detailsId } = useParams();
  const page = parseInt(pageParam || '1', 10);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(() => localStorage.getItem('savedSearchRick') || '');
  const [searchTerm, setSearchTerm] = useLocalStorageQuery('savedSearchRick', '');
  const [searchResults, setSearchResults] = useState<CharacterPreview[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = async (term: string, pageNumber: number) => {
    try {
      setIsLoading(true);
      setHasError(false);

      const trimmed = term.trim();
      const baseUrl = trimmed
        ? `https://rickandmortyapi.com/api/character/?name=${trimmed}&`
        : 'https://rickandmortyapi.com/api/character?';

      const url = `${baseUrl}page=${pageNumber}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');

      const data: ApiResponse = await res.json();

      const characters = data.results.map((char) => ({
        id: char.id,
        name: char.name,
        image: char.image,
      }));

      setSearchResults(characters);
      setTotalPages(data.info.pages);
    } catch (err) {
      console.error('API Error:', err);
      setHasError(true);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm, page);
  }, [searchTerm, page]);

  if (isNaN(page) || page < 1) {
    return <Navigate to="/404" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    setSearchTerm(trimmed);
    navigate('/1');
  };

  const goToPage = (newPage: number) => {
    navigate(`/${newPage}`);
  };

  const handleCardClick = (id: number) => {
    navigate(`/${page}/${id}`);
  };

  return (
    <div className="layout-container" data-testid="search-app">
      <div className="left-panel">
        <SearchControls searchTerm={inputValue} onInputChange={handleInputChange} onSearch={handleSearch} />

        {totalPages > 1 && (
          <div className="pagination top">
            <button disabled={page <= 1} onClick={() => goToPage(page - 1)}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
              Next
            </button>
          </div>
        )}

        {isLoading ? (
          <p>Loading...</p>
        ) : hasError ? (
          <div>Something went wrong while fetching data.</div>
        ) : searchResults.length === 0 ? (
          <p>No characters found.</p>
        ) : (
          <CardList characters={searchResults} onCardClick={handleCardClick} />
        )}
      </div>

      {detailsId && (
        <div className="right-panel" data-testid="right-panel">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default SearchApp;
