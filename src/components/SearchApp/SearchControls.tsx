import React from 'react';

interface Props {
  searchTerm: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchControls: React.FC<Props> = ({ searchTerm, onInputChange, onSearch }) => (
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
  </div>
);

export default SearchControls;
