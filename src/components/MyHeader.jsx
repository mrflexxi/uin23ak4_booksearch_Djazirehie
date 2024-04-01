//MyHeader.jsx

import React from 'react';
import '../styles/App.scss';
import '../styles/MyHeader.scss';

const MyHeader = ({
  searchTerm,
  handleSearchSubmit,
  handleSearchChange,
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
    </header>
  );
}

export default MyHeader;