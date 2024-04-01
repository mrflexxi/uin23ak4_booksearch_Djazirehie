//SearchResult.jsx

import React from 'react';
import BookCard from './BookCard';

function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.map((book, index) => (
        <div key={index} className="book-result">
          <BookCard book={book} />          
        </div>
      ))}
    </div>
  );
}

export default SearchResults;