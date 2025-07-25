import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchControls from './SearchControls';
import CardList from './CardList';
import { Character, ApiResponse } from '../../types';
import { useLocalStorageQuery } from '../../hooks/useLocalStorageQuery';

const SearchApp: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(() => localStorage.getItem('savedSearchRick') || '');
  const [searchTerm, setSearchTerm] = useLocalStorageQuery('savedSearchRick', '');
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const page = parseInt(searchParams.get('page') || '1', 10);

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
      setSearchResults([]); // очистим при ошибке
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm, page);
  }, [searchTerm, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    setSearchTerm(trimmed);
    setSearchParams({ page: '1' });
  };

  const goToPage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <div>
      <SearchControls searchTerm={inputValue} onInputChange={handleInputChange} onSearch={handleSearch} />

      {/* Пагинация */}
      <div className="pagination">
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

      {isLoading ? (
        <p>Loading...</p>
      ) : hasError ? (
        <div>Something went wrong while fetching data.</div>
      ) : (
        <CardList characters={searchResults} />
      )}
    </div>
  );
};

export default SearchApp;
