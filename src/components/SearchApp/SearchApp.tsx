import React from 'react';
import SearchControls from './SearchControls';
import CardList from './CardList';
import { Character, ApiResponse } from '../../types';

interface State {
  searchTerm: string;
  searchResults: Character[];
  isLoading: boolean;
  hasError: boolean;
  triggerError: boolean;
}

class SearchApp extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('savedSearchRick') || '',
      searchResults: [],
      isLoading: false,
      hasError: false,
      triggerError: false,
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = async () => {
    try {
      const trimmed = this.state.searchTerm.trim();
      localStorage.setItem('savedSearchRick', trimmed);
      this.setState({ isLoading: true, hasError: false });

      const url = trimmed
        ? `https://rickandmortyapi.com/api/character/?name=${trimmed}`
        : 'https://rickandmortyapi.com/api/character';

      const res = await fetch(url);

      if (!res.ok) throw new Error('Failed to fetch');

      const data: ApiResponse = await res.json();

      const characters = data.results.map((char) => ({
        id: char.id,
        name: char.name,
        image: char.image,
      }));

      this.setState({ searchResults: characters, isLoading: false });
    } catch (err) {
      console.error('API Error:', err);
      this.setState({ hasError: true, isLoading: false });
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleErrorTrigger = () => {
    this.setState({ triggerError: true });
  };

  render() {
    const { searchTerm, searchResults, isLoading, hasError, triggerError } = this.state;

    if (triggerError) {
      throw new Error('Manual test error from render()');
    }

    return (
      <div>
        <SearchControls
          searchTerm={searchTerm}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
          onErrorClick={this.handleErrorTrigger}
        />

        {isLoading ? (
          <p>Loading...</p>
        ) : hasError ? (
          <div>Something went wrong while fetching data.</div>
        ) : (
          <CardList characters={searchResults} />
        )}
      </div>
    );
  }
}

export default SearchApp;
