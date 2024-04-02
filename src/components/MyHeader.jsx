// MyHeader.jsx

import React from 'react';
import '../styles/App.scss';
import '../styles/MyHeader.scss';

const MyHeader = ({
  searchTerm,
  handleSearchSubmit,
  handleSearchChange,
  searchLengthInfo,
  error,
  noResults,
  isSearching,
  searchResultsCount
}) => {
  return (
    <header className="my-header">
      <h1>Book Search</h1>
      <form onSubmit={handleSearchSubmit} className="search-container">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {searchTerm.length > 0 && (
        <div className="message-container">
        {searchLengthInfo && <p className="short-length-message">Search term must be at least 3 characters long.</p>}
        {error && <p className="message error">Error: {error}</p>}
        {noResults && !isSearching && <p className="no-results-message">No results found. Please try with another search term.</p>}
        {isSearching && <p className="fancy-loading-message">Please wait..., results for {searchTerm} are loading.</p>}
        {!isSearching && searchResultsCount !== undefined && <p className="search-results-count">Found {searchResultsCount} results for '{searchTerm}'.</p>}
      </div>
      )}
    </header>
  );
}

export default MyHeader;
