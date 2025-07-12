import React from 'react';

interface Props {
  searchTerm: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onErrorClick: () => void;
}

class SearchControls extends React.Component<Props> {
  render() {
    const { searchTerm, onInputChange, onSearch, onErrorClick } = this.props;

    return (
      <div className="wrapper-search">
        <input
          type="text"
          value={searchTerm}
          onChange={onInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          placeholder="Search character"
        />
        <button className="search-btn" onClick={onSearch}>
          Search
        </button>
        <button className="error-btn" onClick={onErrorClick}>
          Trigger Error
        </button>
      </div>
    );
  }
}

export default SearchControls;
