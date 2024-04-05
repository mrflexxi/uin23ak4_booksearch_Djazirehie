import React from 'react';
import '../styles/css/App.css';
import '../styles/css/MyHeader.css';

const MyHeader = ({
  searchTerm,
  handleSearchSubmit,
  handleSearchChange,
  searchLengthInfo,
  error,
  noResults,
  isSearching,
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
      <div className="message-container">
        {searchLengthInfo && <p className="short-length-message">Search term must be at least 3 characters long.</p>}
        {error && <p className="message error">Error: {error}</p>}
        {isSearching && <p className="fancy-loading-message">Please wait..., results for "{searchTerm}" are loading.</p>}
        {noResults && !isSearching && <p className="no-results-message">No results found for "{searchTerm}". Please try again with a different search term.</p>}
      </div>
    </header>
  );
}

export default MyHeader;
