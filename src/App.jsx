//App.jsx

import React, { useState, useEffect, useRef } from 'react';
//https://react.dev/reference/react/useState : const [state, setState] = useState(initialState)
//https://react.dev/reference/react/useEffect : useEffect(setup, dependencies?)
//https://react.dev/reference/react/useRef : const ref = useRef(initialValue)
import Header from './components/MyHeader';
import SearchResults from './components/SearchResults';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  const handleSearch = async () => {
    setNoResults(false);
    setError(null);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Failed to fetch search results');

      const data = await response.json();
      setSearchResults(data.docs);
      setNoResults(data.docs.length === 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (searchTerm !== '') {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, handleSearch]);
  

  useEffect(() => {
    if (noResults && searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [noResults]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        error={error}
        noResults={noResults}
      />
      <div className="book-list">
        {searchResults.length > 0 && (
          <SearchResults results={searchResults} />
        )}
      </div>
    </div>
  );
}

export default App;
